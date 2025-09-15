export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Chattr</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #2c2c2c; max-width: 620px; margin: 0 auto; padding: 0; background-color: #fafafa;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #9D50BB, #6E48AA); padding: 35px; text-align: center; border-radius: 0 0 20px 20px;">
      <img src="https://cdn-icons-png.flaticon.com/512/889/889140.png" alt="Chattr Logo" style="width: 85px; height: 85px; margin-bottom: 20px; border-radius: 20%; background-color: white; padding: 12px;">
      <h1 style="color: white; margin: 0; font-size: 30px; font-weight: 600;">Welcome to Chattr 🎉</h1>
      <p style="color: #e6e6e6; margin-top: 10px; font-size: 16px;">Your space to connect, share, and chat freely</p>
    </div>

    <!-- Body -->
    <div style="background-color: #ffffff; padding: 40px; border-radius: 16px; margin: -20px 20px 20px 20px; box-shadow: 0 6px 18px rgba(0,0,0,0.07);">
      <p style="font-size: 18px; color: #6E48AA;"><strong>Hey ${name},</strong></p>
      <p>We’re super excited to have you join <strong>Chattr</strong> — a modern chat app where conversations feel fast, fun, and secure. 🚀</p>
      
      <!-- Steps -->
      <div style="background-color: #fdf6ff; padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 5px solid #9D50BB;">
        <p style="font-size: 16px; margin: 0 0 15px 0; font-weight: 500;">Here’s how to get started:</p>
        <ol style="padding-left: 20px; margin: 0; color: #444;">
          <li style="margin-bottom: 10px;">Set up your profile & bio 🖼️</li>
          <li style="margin-bottom: 10px;">Find your friends or teammates 👥</li>
          <li style="margin-bottom: 10px;">Start a chat or group channel 💬</li>
          <li>Share files, emojis, and reactions 🎨</li>
        </ol>
      </div>

      <!-- Button -->
      <div style="text-align: center; margin: 35px 0;">
        <a href=${clientURL} style="background: linear-gradient(135deg, #9D50BB, #6E48AA); color: white; text-decoration: none; padding: 14px 40px; border-radius: 60px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">Open Chattr</a>
      </div>

      <p style="margin-bottom: 6px;">Need help? Our team’s got your back — anytime, anywhere.</p>
      <p style="margin-top: 0;">Welcome aboard, and happy chatting 🎊</p>

      <p style="margin-top: 30px; margin-bottom: 0; font-size: 15px;">Cheers,<br>The <strong>Chattr Team</strong></p>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; padding: 25px; color: #aaa; font-size: 12px;">
      <p>© 2025 Chattr. All rights reserved.</p>
      <p>
        <a href="#" style="color: #9D50BB; text-decoration: none; margin: 0 12px;">Privacy Policy</a>
        <a href="#" style="color: #9D50BB; text-decoration: none; margin: 0 12px;">Terms</a>
        <a href="#" style="color: #9D50BB; text-decoration: none; margin: 0 12px;">Support</a>
      </p>
    </div>

  </body>
  </html>
  `;
}
