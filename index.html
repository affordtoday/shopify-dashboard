const crypto = require('crypto');

export default function handler(req, res) {
  const { query } = req;
  const customerId = query.logged_in_customer_id;

  // 1. IF NOT LOGGED IN
  if (!customerId) {
    res.setHeader('Content-Type', 'application/liquid');
    return res.status(200).send(`
      <div style="text-align:center; padding:60px 20px;">
        <h2>🔒 Member Access Only</h2>
        <p>Please log in to view your dashboard.</p>
        <a href="/account/login" class="btn button">Log In</a>
      </div>
    `);
  }

  // 2. IF LOGGED IN (The Clean Dashboard)
  res.setHeader('Content-Type', 'application/liquid');
  res.status(200).send(`
    {% layout none %}
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
      /* We add a specific class wrapper to avoid breaking your main theme */
      .custom-dashboard-wrapper { font-family:'Inter',sans-serif; color:#1a1a1a; background:#ECECEC; min-height: 100vh; padding: 20px;}
      .dashboard-container { max-width:880px; margin:0 auto; background:#FFF; border-radius:16px; box-shadow:0 2px 24px #b1bbbe18; padding:38px 30px 36px 30px;}
      .dashboard-header { display:flex; align-items:center; border-bottom:2px solid #E1E2DC; padding-bottom:20px;}
      .user-avatar { width:68px; height:68px; background:#d7dad7; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2rem; color:#5f684f; font-weight:700; margin-right:18px;}
      .user-info { flex:1; }
      .user-info h2{font-size:1.5rem;margin:0 0 5px 0;}
      .user-info p{color:#5f684f;margin:0;font-size:1.05rem;}
      .logout-link { color:#5f684f; font-weight:600; text-decoration:underline; margin-left:28px; font-size:1rem; cursor:pointer; background:none; border:none; padding:0;}
      
      .dashboard-section { margin-top:36px; margin-bottom:32px; }
      .section-title { font-size:1.16rem;font-weight:600;color:#222;margin-bottom:13px;}
      .activity-list li, .purchase-list li, .budget-list li { list-style:none; background:#f4f5f2; border-radius:9px; margin-bottom:9px; padding:13px 20px; color:#444; display:flex; justify-content:space-between; align-items:center;}
      .card-pill { background:#babd97; border-radius:32px; color:#222; padding:7px 19px; margin-right: 10px; display:inline-block;}
      .add-card-btn { background:#5f684f; color:#fff; border:none; padding:8px 20px; border-radius:999px; cursor:pointer;}
      
      /* Modal Styles */
      .modal { display:none; position:fixed; top:0; left:0; right:0; bottom:0; z-index:9999; background:rgba(0,0,0,0.5); justify-content:center; align-items:center;}
      .modal.active { display:flex; }
      .modal-content { background:white; padding:30px; border-radius:12px; width:90%; max-width:400px;}
      .close-modal { margin-top:10px; background:transparent; border:1px solid #ccc; padding:5px 15px; border-radius:5px; cursor:pointer;}
    </style>

    <div class="custom-dashboard-wrapper">
      <div class="dashboard-container">
        
        <div class="dashboard-header">
          <div class="user-avatar">MJ</div>
          <div class="user-info">
            <h2>Welcome Back!</h2>
            <p>Customer ID: ${customerId}</p>
          </div>
          <a href="/account/logout" class="logout-link">Log Out</a>
        </div>

        <div class="dashboard-section">
          <div class="section-title">Your Budget Templates</div>
          <ul class="budget-list" style="padding:0;">
            <li>
              <span>2024 Wedding Budget.xlsx</span>
              <a href="#" style="color:#5f684f;">Download</a>
            </li>
             <li>
              <span>No other files found.</span>
              <button class="add-card-btn" onclick="alert('Upload coming soon!')">+ Upload</button>
            </li>
          </ul>
        </div>

      </div>
    </div>
  `);
}
