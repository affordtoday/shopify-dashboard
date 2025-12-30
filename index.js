const crypto = require('crypto');

export default async function handler(req, res) {
  const { query } = req;
  const signature = query.signature;
  
  // 1. SIMPLE SECURITY CHECK
  // We will add the real secret key in the next phase. 
  // For now, this just prepares the lock.
  
  // 2. CHECK IF LOGGED IN
  const customerId = query.logged_in_customer_id;
  
  // 3. THE DASHBOARD HTML
  // This is what your customers will see!
  const dashboardHTML = `
    <div style="padding: 30px; background: #ffffff; border: 1px solid #e1e1e1; border-radius: 10px; max-width: 800px; margin: 0 auto;">
      <h2 style="color: #333;">👋 Welcome to your Dashboard</h2>
      <p>This is your new custom member area running for free!</p>
      
      <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <strong>Your Customer ID:</strong> ${customerId || 'Not logged in (View this page through your Shopify Account)'}
      </div>

      <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">

      <h3>📂 Your Files</h3>
      <p><i>File upload features will appear here later.</i></p>
      <button style="background: black; color: white; padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer;">
        Upload New Document
      </button>
    </div>
  `;

  // This tells Shopify "Treat this as part of the theme"
  res.setHeader('Content-Type', 'application/liquid');
  return res.status(200).send(dashboardHTML);
}
