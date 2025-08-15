import supabase from "../lib/supabaseClient"; // Add this to your config.js

// Example wrapper functions for CRUD operations
export const database = {
  // Select data
  get: async (table, query = {}) => {
    let req = supabase.from(table).select("*");
    // Optionally add filters from query object
    Object.entries(query).forEach(([key, value]) => {
      req = req.eq(key, value);
    });
    const { data, error } = await req;
    if (error) throw error;
    return data;
  },

  // Insert data
  post: async (table, data) => {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select();
    if (error) throw error;
    return result;
  },

  // Update data
  put: async (table, id, data) => {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq("id", id)
      .select();
    if (error) throw error;
    return result;
  },

  // Delete data
  delete: async (table, id) => {
    const { data: result, error } = await supabase
      .from(table)
      .delete()
      .eq("id", id);
    if (error) throw error;
    return result;
  },

  upsert: async (table, data, conflict) => {
    const { data: result, error } = await supabase
      .from(table)
      .upsert(data, { onConflict: conflict });
    if (error) throw error;
    return result;
  },

  // Subscribe to real-time changes
  subscribe: (table, filter = null, callback) => {
    const channelName = `realtime:${table}${
      filter ? `:${JSON.stringify(filter)}` : ""
    }`;

    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "*", // listen to INSERT, UPDATE, DELETE
          schema: "public",
          table: table,
          ...(filter || {}), // optional filter like { filter: 'conversation_id=eq.123' }
        },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe();

    return channel;
  },

  unsubscribe: (channel) => {
    supabase.removeChannel(channel);
  },

  getConversations: async () => {
    // 1. Fetch conversations with related contacts and latest message
    const { data, error } = await supabase
      .from("conversations")
      .select(
        `
    id,
    phone_number_id,
    org_id,
    contact_id,
    contact:contacts (
      id,
      phone,
      name
    ),
    messages (
      id,
      body,
      created_at
    )
  `
      )
      .order("created_at", { referencedTable: "messages", ascending: false })
      .limit(1, { foreignTable: "messages" });

    if (error) throw error;

    // 2. Deduplicate so only last message per conversation remains
    const result = data.map((conv) => {
      const lastMessage = conv.messages?.[0] || null;
      let messageText = lastMessage?.body || "";
      // Truncate to 50 characters
      if (messageText.length > 50) {
        messageText = messageText.substring(0, 50) + "...";
      }

      return {
        id: conv.id,
        contact_id: conv.contact_id,
        phone: conv.contact.phone,
        phone_number_id: conv.phone_number_id,
        org_id: conv.org_id,
        contact_name: conv.contact.name,
        last_message: messageText,
        last_message_time: lastMessage?.created_at || null,
      };
    });

    return result;
  },
};

// Authentication services
export const supabaseAuth = {
  // Sign up with email and password
  signup: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },

  // Sign in with email and password
  signin: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Sign in with Facebook
  signinWithFacebook: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });
    if (error) throw error;
    // Supabase will redirect to Facebook, so no data is returned here
    return true;
  },

  // Sign out
  signout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  },
};
