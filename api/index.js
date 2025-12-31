const crypto = require('crypto');

export default function handler(req, res) {
  const { query } = req;
  const customerId = query.logged_in_customer_id;

  // 1. IF NOT LOGGED IN: Show Login Prompt
  if (!customerId) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(`
      <div style="font-family: sans-serif; text-align:center; padding:50px;">
        <h2>🔒 Member Access Only</h2>
        <p>Please log in to access your Afford Today Dashboard.</p>
        <a href="/account/login" style="background:#5f684f; color:white; padding:12px 24px; text-decoration:none; border-radius:999px;">Log In</a>
      </div>
    `);
  }

  // 2. IF LOGGED IN: Show Your Custom Dashboard
  res.setHeader('Content-Type', 'application/liquid');
  
  // We use backticks (`) to hold your big HTML block
  res.status(200).send(`
    {% layout none %}
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Account Dashboard | Afford Today</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        body { background:#ECECEC; font-family:'Inter',Helvetica,Arial,sans-serif; margin:0; color:#1a1a1a;}
        .dashboard-container { max-width:880px; margin:32px auto; background:#FFF; border-radius:16px; box-shadow:0 2px 24px #b1bbbe18; padding:38px 30px 36px 30px;}
        .dashboard-header { display:flex; align-items:center; border-bottom:2px solid #E1E2DC; padding-bottom:20px;}
        .user-avatar { width:68px; height:68px; background:#d7dad7; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2rem; color:#5f684f; font-weight:700; margin-right:18px;}
        .user-info { flex:1; }
        .user-info h2{font-size:1.5rem;margin:0 0 5px 0;}
        .user-info p{color:#5f684f;margin:0;font-size:1.05rem;}
        .logout-link { color:#5f684f; font-weight:600; text-decoration:underline; margin-left:28px; font-size:1rem; cursor:pointer; background:none; border:none; padding:0;}
        .dashboard-section { margin-top:36px; margin-bottom:32px; }
        .section-title { font-size:1.16rem;font-weight:600;color:#222;margin-bottom:13px;}
        .activity-list, .purchase-list, .budget-list { list-style:none; padding:0; margin:0; font-size:1.03rem;}
        .activity-list li, .purchase-list li, .budget-list li { background:#f4f5f2; border-radius:9px; margin-bottom:9px; padding:13px 20px; color:#444; box-shadow:0 1px 0 #ececec; display:flex; justify-content:space-between; align-items:center;}
        .purchase-list li span.order-link { color:#5f684f; text-decoration:underline; cursor:pointer; font-size:0.95em;}
        .budget-list li span.budget-link { color:#5f684f; text-decoration:underline; cursor:pointer; font-size:0.95em;}
        .profile-edit-link { color:#5f684f; font-size:0.98rem; text-decoration:underline; margin-left:12px;}
        .payment-cards { display:flex; flex-direction:row; gap: 16px; flex-wrap:wrap; align-items:center;}
        .card-pill { background:#babd97; border-radius:32px; color:#222; font-weight:500; font-size:1rem; padding:7px 19px; display:flex; align-items:center; gap:10px;}
        .add-card-btn { background:#5f684f; color:#fff; border:none; padding:8px 20px; border-radius:999px; font-size:1rem; font-weight:600; cursor:pointer; margin-left:4px; transition:background .17s;}
        .add-card-btn:hover{background:#47513b;}
        .return-btn { background:#5f684f; color:#fff; border:none; border-radius:999px; font-size:0.98rem; padding:7px 20px; margin-left:8px; font-weight:600; cursor:pointer; transition:background .17s;}
        .return-btn:hover{background:#47513b;}
        @media (max-width:700px) { .dashboard-container {padding:12px;} .dashboard-header {flex-direction:column; align-items:flex-start; gap:14px;} .logout-link {margin-left:0; margin-top:6px;}}

        /* Modal styles */
        .modal {
          display:none; position:fixed; top:0; left:0; right:0; bottom:0; z-index:10000;
          background:rgba(34,38,41,0.33); justify-content:center; align-items:center;
        }
        .modal.active { display:flex; }
        .modal-content {
          background:#fff; border-radius:16px; padding:36px 28px 28px 28px; max-width:410px; width:96vw; box-shadow:0 2px 24px #4443;
          display:flex; flex-direction:column; align-items:stretch;
        }
        .modal-header { font-size:1.19rem; font-weight:600; color:#222; margin-bottom:14px;}
        .modal label { margin-bottom:5px; font-size:1rem; color:#222; }
        .modal textarea { min-height:70px; width:100%; font-family:inherit; font-size:1rem; padding:7px 8px; margin-bottom:14px; border:1px solid #ccc; border-radius:6px;}
        .modal input[type='file'] { margin-bottom:18px; }
        .modal input[type='submit'], .modal .close-modal {
            background:#5f684f; color:#fff; border:none; padding:0.8em 1.8em; font-size:1rem;
            border-radius:999px; font-weight:600; cursor:pointer; margin-right:12px; transition:background .17s;
        }
        .modal input[type='submit']:hover, .modal .close-modal:hover { background: #47513b; }
        .success-msg { color:#5f684f; margin-top:12px; font-weight:600; }
      </style>
    </head>
    <body>
      <div class="dashboard-container">
        <div class="dashboard-header">
          <div class="user-avatar" aria-label="User Initials">MJ</div>
          <div class="user-info">
            <h2>Welcome, Member #${customerId}!</h2>
            <p>Email: {{ customer.email }} <a href="/account" class="profile-edit-link">Edit Profile</a></p>
          </div>
          <a href="/account/logout" class="logout-link">Log Out</a>
        </div>

        <div class="dashboard-section">
          <div class="section-title">Your Budget Templates</div>
          <ul class="budget-list">
            <li>
              2024 Wedding Budget.xlsx – <span class="budget-link">Download</span>
            </li>
            <li>
              <button class="add-card-btn" style="margin-left:0;" onclick="alert('Database Connection Required for Uploads')">+ Add/Upload New Template</button>
            </li>
          </ul>
        </div>
        
        <div class="dashboard-section">
          <div class="section-title">Purchase History</div>
          <p><i>History loading...</i></p>
        </div>

      </div>

      <script>
         // ... (Your modal scripts will go here if needed) ...
      </script>
    </body>
    </html>
  `);
}
