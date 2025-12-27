document.addEventListener("DOMContentLoaded", async () => {

  const supabaseUrl = "https://ljwaezduqvuxhyhcyruy.supabase.co";
  const supabaseKey = "sb_publishable_3I9rJGQ5Pg0NwOxCTRsy7g_p9psbzzF";

  const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
  );

// const { data: { session } } = await supabase.auth.getSession();

// if (session) {
//   localStorage.setItem("isLoggedIn", "true");
//   localStorage.setItem("userName", session.user.email);
//   window.location.href = "index.html";
//   return;
// }



  const loginForm = document.getElementById("loginForm");
  const messageDiv = document.getElementById("message");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    messageDiv.style.display = "block";
    messageDiv.textContent = "Logging in...";
    messageDiv.className = "message";

    // 🔑 SUPABASE LOGIN
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      messageDiv.textContent = error.message;
      messageDiv.className = "message error";
      return;
    }

    // ✅ LOGIN SUCCESS
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", email);

    messageDiv.textContent = "Login successful!";
    messageDiv.className = "message success";

    // 👉 HOME PAGE
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  });

});
