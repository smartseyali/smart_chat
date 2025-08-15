# 📘 Technical Documentation: WhatsApp Business API Platform

## 🔧 Tech Stack

- **Frontend**: React.js (with Vite)
- **Backend**: Supabase (PostgreSQL, Edge Functions, Auth, Realtime)
- **WhatsApp API**: Meta WhatsApp Cloud API
- **Deployment**: Vercel / Netlify (Frontend), Supabase Hosting (Backend)

## 🧱 Project Structure

### 📁 Frontend (React + Vite)

```
/frontend
├── /public
├── /src
│   ├── /components
│   ├── /pages
│   ├── /services  # API layer
│   ├── /hooks
│   ├── /utils
│   └── main.tsx
├── index.html
├── vite.config.ts
└── package.json
```

### 📁 Backend (Supabase)

```
/supabase
├── /functions       # Edge Functions (TypeScript)
├── /migrations      # SQL Schema definitions
├── supabase.sql     # Schema definition
└── .env             # API keys, secrets
```

## 🔑 Features

- ✅ User Authentication (Supabase Auth)
- 📩 Send/Receive WhatsApp messages (via Cloud API)
- 📄 Message templates and media management
- 📊 Dashboard for delivery status and analytics
- 🧠 Webhook integration via Edge Functions
- 🔔 Realtime updates with Supabase Realtime
- 📁 Media Upload Support
- ⏰ Message Scheduling via Supabase Cron Jobs
- 📈 User Analytics (Messages Sent, Read Rate)
- 🛠 Admin Panel for Template Management

## 🔐 Supabase Configuration

### Tables

- **users**, **messages**, **templates** (see detailed structure above)

## 📲 WhatsApp Cloud API Integration

### Setup, Send Message, Webhook Handling

(As detailed in earlier section)

## 🧩 React Frontend Integration

Includes message composer, dashboard, auth, API service

## ⚡ Edge Function Sample

(As detailed in earlier section)

## 🔄 Realtime Subscriptions

Use Supabase Realtime to update UI instantly.

## 📁 Media Upload Support

- Use Supabase Storage to store media (PDFs, images)
- Store URLs in `messages` table
- Use appropriate `type` when sending via WhatsApp API

## ⏰ Message Scheduling (Supabase Cron)

- Use Supabase Scheduled Edge Functions (cron jobs)
- Example: Schedule birthday wishes, marketing campaigns

```ts
// schedule.ts (Edge Function)
const res = await fetch(WA_API, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({ to, type: "text", text: { body: "Scheduled msg" } }),
});
```

## 📈 User Analytics

- Track messages per user from `messages` table
- Create views or use Supabase Dashboard or Metabase

## 🛠 Admin Panel

- Role-based access (admin role)
- Add/edit/remove templates
- Approve templates before sending

## 🚀 Deployment

Deploy Frontend on Vercel/Netlify and Backend is managed via Supabase

## 📌 .env Template

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=public-anon-key
WHATSAPP_ACCESS_TOKEN=meta-access-token
WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id
```

## 🧮 Extended WhatsApp Platform Schema (PostgreSQL)

```sql
-- Organizations / tenants
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_user_id uuid references auth.users(id) not null
);

-- User ↔ org membership & roles
create type user_role as enum ('owner','admin','agent','viewer');
create table user_org_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  org_id uuid references organizations(id) not null,
  role user_role not null default 'viewer',
  unique(user_id, org_id)
);

--WhatsApp / Meta config
create table waba_accounts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) not null,
  waba_id text not null,                         -- Meta WABA id
  app_id text not null,
  app_secret text not null,                      -- store in vault/secret store; or encrypt
  verify_token text not null,
  access_token text not null,                    -- long-lived token (rotate via cron if needed)
  status text default 'active'
);

create table whatsapp_phone_numbers (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) not null,
  waba_account_id uuid references waba_accounts(id),
  phone_number_id text not null,                 -- Meta phone number id
  display_phone_number text not null,
  quality_rating text,
  status text,
  unique (phone_number_id)
);

--Templates
create type template_status as enum ('approved','rejected','pending','paused');
create table whatsapp_templates (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) not null,
  waba_account_id uuid references waba_accounts(id),
  name text not null,
  category text not null,                        -- MARKETING, UTILITY, AUTHENTICATION
  language text not null,                        -- e.g., en_US
  status template_status not null,
  components jsonb not null,                     -- body, header, buttons, etc.
  meta_template_id text not null,
  unique (org_id, meta_template_id)
);

--Contacts & opt-ins
create type optin_status as enum ('opted_in','opted_out','unknown');
create table contacts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) not null,
  phone text not null,
  name text,
  country text,
  timezone text,
  tags text[] default '{}',
  optin optin_status not null default 'unknown',
  last_session_started_at timestamptz,
  last_message_at timestamptz,
  unique(org_id, phone)
);

--Conversations & messages
create type wa_direction as enum ('inbound','outbound');
create type wa_msg_type as enum ('text','image','document','audio','video','sticker','button','interactive','template','location','contacts','unknown');

create table conversations (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) not null,
  contact_id uuid references contacts(id) not null,
  phone_number_id text not null,      -- which sender number
  is_open boolean default true,
  last_message_at timestamptz
);
create index conversations_contact_id_idx on conversations(contact_id);

create table messages (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) not null,
  conversation_id uuid references conversations(id) not null,
  contact_id uuid references contacts(id) not null,
  phone_number_id text not null,
  direction wa_direction not null,
  wa_message_id text,                 -- Meta message id (for outbound/inbound)
  type wa_msg_type not null,
  status text,                        -- sent, delivered, read, failed, etc.
  template_id uuid references whatsapp_templates(id),
  body text,
  payload jsonb,                      -- full raw payload
  error text
);
create index messages_wa_message_id_idx on messages(wa_message_id);

--Events & logs
create table webhook_events (
  id bigserial primary key,
  org_id uuid references organizations(id),
  headers jsonb,
  payload jsonb not null,
  signature_valid boolean,
  created_at timestamptz default now()
);

create table audit_logs (
  id bigserial primary key,
  org_id uuid references organizations(id),
  user_id uuid references auth.users(id),
  action text,
  target_type text,
  target_id uuid,
  meta jsonb,
  created_at timestamptz default now()
);

Campaigns / Flows (optional, Phase 2)
create type campaign_status as enum ('draft','scheduled','running','paused','completed','failed');

create table campaigns (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) not null,
  name text not null,
  template_id uuid references whatsapp_templates(id),
  segment_sql text,                           -- or store a materialized segment table
  scheduled_at timestamptz,
  status campaign_status not null default 'draft'
);

create table campaign_messages (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) not null,
  campaign_id uuid references campaigns(id),
  contact_id uuid references contacts(id),
  message_id uuid references messages(id),
  status text,
  error text
);

--RLS (Row Level Security) sketch

-- Enable Row Level Security on all tables
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_org_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waba_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_phone_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_templates ENABLE ROW LEVEL SECURITY;

-- Create a helper function to check if user is a member of an organization
CREATE OR REPLACE FUNCTION public.is_org_member(org_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_org_memberships
    WHERE user_id = auth.uid() AND org_id = is_org_member.org_id
  );
$$;

-- Create a helper function to check if user has a specific role in an organization
CREATE OR REPLACE FUNCTION public.has_org_role(org_id uuid, required_role text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_org_memberships
    WHERE user_id = auth.uid()
      AND org_id = has_org_role.org_id
      AND role = required_role::public.user_role
  );
$$;

-- Create a helper function to get user's organizations
CREATE OR REPLACE FUNCTION public.get_user_orgs()
RETURNS SETOF uuid
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT org_id FROM public.user_org_memberships WHERE user_id = auth.uid();
$$;

-- Policies for organizations table
CREATE POLICY "Users can view organizations they belong to"
ON public.organizations
FOR SELECT USING (id IN (SELECT get_user_orgs()));

CREATE POLICY "Owners can update their organizations"
ON public.organizations
FOR UPDATE USING (owner_user_id = auth.uid());

-- Policies for user_org_memberships table
CREATE POLICY "Users can view their own memberships"
ON public.user_org_memberships
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Organization owners can manage memberships"
ON public.user_org_memberships
FOR ALL USING (org_id IN (
  SELECT id FROM public.organizations WHERE owner_user_id = auth.uid()
));

-- Policies for contacts table
CREATE POLICY "Org members can view contacts"
ON public.contacts
FOR SELECT USING (is_org_member(org_id));

CREATE POLICY "Org admins can manage contacts"
ON public.contacts
FOR ALL USING (is_org_member(org_id) AND has_org_role(org_id, 'admin'));

-- Policies for conversations table
CREATE POLICY "Org members can view conversations"
ON public.conversations
FOR SELECT USING (is_org_member(org_id));

CREATE POLICY "Org admins can manage conversations"
ON public.conversations
FOR ALL USING (is_org_member(org_id) AND has_org_role(org_id, 'admin'));

-- Policies for messages table
CREATE POLICY "Org members can view messages"
ON public.messages
FOR SELECT USING (is_org_member(org_id));

CREATE POLICY "Org admins can manage messages"
ON public.messages
FOR ALL USING (is_org_member(org_id) AND has_org_role(org_id, 'admin'));

-- Policies for campaigns table
CREATE POLICY "Org members can view campaigns"
ON public.campaigns
FOR SELECT USING (is_org_member(org_id));

CREATE POLICY "Org admins can manage campaigns"
ON public.campaigns
FOR ALL USING (is_org_member(org_id) AND has_org_role(org_id, 'admin'));

-- Policies for campaign_messages table
CREATE POLICY "Org members can view campaign messages"
ON public.campaign_messages
FOR SELECT USING (is_org_member(org_id));

CREATE POLICY "Org admins can manage campaign messages"
ON public.campaign_messages
FOR ALL USING (is_org_member(org_id) AND has_org_role(org_id, 'admin'));

-- Policies for whatsapp_templates table
CREATE POLICY "Org members can view templates"
ON public.whatsapp_templates
FOR SELECT USING (is_org_member(org_id));

CREATE POLICY "Org admins can manage templates"
ON public.whatsapp_templates
FOR ALL USING (is_org_member(org_id) AND has_org_role(org_id, 'admin'));

-- Policies for waba_accounts table
CREATE POLICY "Org members can view WABA accounts"
ON public.waba_accounts
FOR SELECT USING (is_org_member(org_id));

CREATE POLICY "Org admins can manage WABA accounts"
ON public.waba_accounts
FOR ALL USING (is_org_member(org_id) AND has_org_role(org_id, 'admin'));

-- Policies for whatsapp_phone_numbers table
CREATE POLICY "Org members can view phone numbers"
ON public.whatsapp_phone_numbers
FOR SELECT USING (is_org_member(org_id));

CREATE POLICY "Org admins can manage phone numbers"
ON public.whatsapp_phone_numbers
FOR ALL USING (is_org_member(org_id) AND has_org_role(org_id, 'admin'));

-- Policies for webhook_events table
CREATE POLICY "Org members can view webhook events"
ON public.webhook_events
FOR SELECT USING (is_org_member(org_id));

CREATE POLICY "Org admins can manage webhook events"
ON public.webhook_events
FOR ALL USING (is_org_member(org_id) AND has_org_role(org_id, 'admin'));

-- Policies for audit_logs table
CREATE POLICY "Org members can view audit logs"
ON public.audit_logs
FOR SELECT USING (is_org_member(org_id));

-- Allow system to insert audit logs without RLS restrictions
CREATE POLICY "Bypass RLS for audit log inserts"
ON public.audit_logs
FOR INSERT WITH CHECK (true);
```

## 🛣️ Development Roadmap

This project follows a phased roadmap to build a scalable WhatsApp Business API platform using Supabase and React.

---

### ✅ Phase 0 – Foundations

- [x] Create Supabase project with:
  - Auth
  - Storage
  - Edge Functions
- [x] Set up `.env` with required credentials:
  - `META_APP_SECRET`
  - `VERIFY_TOKEN`
  - `WABA_PHONE_NUMBER_ID`
  - `ACCESS_TOKEN`
- [x] Define database schema & enable Row-Level Security (RLS)
- [x] Implement WhatsApp Webhook (Edge Function):
  - `GET` for webhook verification
  - `POST` for receiving message events
- [x] Minimal React app with:
  - Login/signup flow
  - Organization creation
  - Webhook verification UI

---

### ✉️ Phase 1 – Core Messaging

- [ ] Contact management with opt-in flow
- [ ] Send template messages (for use cases outside the 24h session window)
- [ ] 2-way chat inbox (enforce 24-hour session window)
- [ ] Message status syncing (sent, delivered, read)
- [ ] Template sync from Meta (load available templates dynamically)

---

### 📢 Phase 2 – Campaigns & Automation

- [ ] Campaign builder with scheduling and segmentation
- [ ] Drip/Flow engine:
  - Time-delayed messages
  - Conditional flows
- [ ] Analytics dashboards:
  - Message metrics
  - Campaign performance
- [ ] User roles and team permission controls

---

### 🚀 Phase 3 – Polishing & Scale

- [ ] Support for multiple WABA accounts / numbers
- [ ] Message rate limiting, retries, exponential backoff
- [ ] Webhook replay system and dead-letter queue
- [ ] Audit logs, GDPR compliance tools, data export options

---

🔄 This roadmap will evolve as the platform grows. Contributions and suggestions are welcome!
