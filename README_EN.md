# 🕒 RenewHelper - Service Lifecycle Manager

**[English]** | [中文](./README.md)

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange?logo=cloudflare)
![Vue.js](https://img.shields.io/badge/Frontend-Vue3%20%2B%20ElementPlus-42b883?logo=vue.js)
![License](https://img.shields.io/badge/License-MIT-blue)

**RenewHelper** is a full-stack service lifecycle reminder and management tool based on **Cloudflare Workers**. It is designed to manage periodic subscriptions, domain renewals, server expirations, and more. It requires no server (Serverless), incurs zero hosting costs, and features a stunning Mecha-style UI, a powerful Lunar/Solar calendar core, multi-channel notifications, and iCal schedule synchronization.

<div align="center">
  <img src="./assets/mainUI_darkEN_shot.png" alt="RenewHelper 界面预览" width="800">
  <img src="./assets/mainUI_lightCN_shot.png" alt="RenewHelper 界面预览" width="800"> 
</div>

## ✨ Key Features

- **⚡️ Serverless Architecture**: Runs entirely on Cloudflare Workers using KV storage. No VPS required, and the free tier is usually sufficient for personal use.
- **📅 Smart Cycle Management**:
  - Supports both **Solar (Gregorian)** and **Lunar** calendar cycles. Built-in high-precision Lunar algorithm (1900-2100).
  - Perfect for handling monthly/yearly subscriptions (Solar) or birthdays/traditional festivals (Lunar).
  - Supports automatic calculation based on Day, Month, or Year intervals.
  - Two modes: "Cycle Subscription" (Repeating) and "Expiration Reset" (Manual extension).
- **🔔 Multi-Channel Notifications**:
  - Built-in support for **Telegram, Bark, PushPlus, NotifyX, Resend (Email), and Webhook**.
  - Customizable advance notice days and daily push times.
- **🤖 Automation**:
  - **Auto-Renew**: Automatically updates the next due date upon expiration.
  - **Auto-Disable**: Automatically marks services as disabled if they are overdue for too long.
  - **Cron Triggers**: Supports daily scheduled checks via Cloudflare Cron Triggers.
- **📆 ICS Calendar Subscription**: Generates standard `.ics` subscription links. Seamlessly integrates with iOS Calendar, Google Calendar, or Outlook, supporting timezone-aware precise reminders synchronized to your phone.
- **🛡️ Secure & Reliable**:
  - JWT authentication with automatic high-strength key generation.
  - Hybrid rate-limiting strategy (Memory + KV) to prevent brute-force attacks.
  - Data is stored only in your private Cloudflare KV.
  - Sensitive operations (Delete, Reset) require secondary confirmation.
- **🎨 Modern UI**:
  - Single-file frontend built with Vue 3 + Element Plus.
  - Dark/Light mode support.
  - Fully responsive design for mobile and desktop.
  - Bilingual interface (English/Chinese).
  - Data Import/Export for backup.

---

## 🚀 Deployment Guide

### Method 1: One-Click Deployment (Recommended)

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ieax/renewhelper)

1.  Click the button above.
2.  Authorize Cloudflare to access your GitHub account (to Fork the repository).
3.  Follow the instructions to complete the deployment. Cloudflare will automatically create the Worker and KV Namespace for you.
4.  **IMPORTANT**: After deployment, go to Cloudflare Dashboard -> Workers & Pages -> Your Project -> **Settings** -> **Variables**.
    - Add Environment Variable: `AUTH_PASSWORD`. Set the value to your desired login password (default is `admin`).
    - Bind KV Namespace: Ensure the variable name is `RENEW_KV` (Do not change this name!).

### Method 2: Manual Deployment (Web Dashboard)

If you don't use GitHub, you can deploy directly via the Cloudflare Dashboard.

#### Step 1: Create a KV Namespace

1.  Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2.  Go to **Workers & Pages** -> **KV** from the left menu.
3.  Click **Create a namespace**.
4.  Enter the name: `RENEW_KV` or any name you prefer (Uppercase recommended), then click **Add**.

#### Step 2: Create a Worker Service

1.  Go back to **Workers & Pages** -> **Overview**.
2.  Click **Create application** -> **Create Worker**.
3.  Name your worker (e.g., `renewhelper`) and click **Deploy**.
4.  Once deployed, click **Edit code** to open the editor.

#### Step 3: Paste Code

1.  In the file list on the left, select `worker.js`.
2.  **Select All and Delete** the default code.
3.  Copy and paste the complete code from `_worker.js` provided in this project.
4.  Click **Deploy** on the top right to save.

#### Step 4: Bind KV Database (Crucial)

1.  Click the arrow in the top left to return to the Worker details page.
2.  Go to **Settings** -> **Variables**.
3.  Scroll down to **KV Namespace Bindings**.
4.  Click **Add binding**:
    - **Variable name**: Must be `RENEW_KV` (Do not change this!).
    - **KV Namespace**: Select the namespace you created in Step 1.
5.  Click **Save and deploy**.

#### Step 5: Set Login Password

1.  Still on the **Variables** page, scroll up to **Environment Variables**.
2.  Click **Add variable**:
    - **Variable name**: `AUTH_PASSWORD`
    - **Value**: Enter your desired password (default is `admin` if left unset).
3.  Click **Save and deploy**.

#### Step 6: Set Cron Trigger

To enable auto-renewal and notifications, **you must set a Cron Trigger.**

1.  Click the **Triggers** tab at the top.
2.  Scroll down to **Cron Triggers**.
3.  Click **Add Cron Trigger**.
4.  **Cron schedule**: Enter `0/30 * * * *` exactly (This means check every 30 minutes. Do not change this logic!).
5.  Click **Add Trigger**.

### 🎉 Deployment Complete!

---

## ⚙️ Configuration

After deployment, visit your Worker URL or custom domain (e.g., `https://renewhelper.your-name.workers.dev`).

1.  **First Login**: Unlock using the `AUTH_PASSWORD` you set (default `admin`).
2.  **System Settings**: Click the **SETTINGS** button in the top right corner.
    - **Timezone**: Critical! Select your local timezone (e.g., `Asia/Shanghai` or `America/New_York`). This determines the accuracy of reminders and calendar events.
    - **Master Notification Switch**: Enable to configure specific notification channels.

<div align="center">
  <img src="./assets/configUIhelp_darkEN_shot.png" alt="RenewHelper 界面预览" width="800">
</div>

### 📢 Notification Channels

Configure these in "Settings" -> "Notifications":

| Channel            | Parameter Description                                                       | How to Obtain/Configure                                                                                                                                                                                                                                  |
| :----------------- | :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Telegram**       | **Token**: Bot Token<br>**Chat ID**: Your User ID or Group ID               | 1. Create a bot via [@BotFather](https://t.me/BotFather) to get the Token. Add `@userinfobot` to get your UserID。<br>2. Or visit `https://api.telegram.org/bot<YourToken>/getUpdates` in your browser.<br>3. Send a message to your bot.<br>4. Refresh the URL above to find your Chat ID.         |
| **Bark** (iOS)     | **Server**: Server URL<br>**Device Key**: Key                               | 1. Download the Bark App from the App Store.<br>2. Copy the Server URL and Key displayed in the App.                                                                                                                                                     |
| **PushPlus**       | **Token**: User Token                                                       | 1. Visit [PushPlus Official Site](https://www.pushplus.plus/).<br>2. Login via WeChat to get your Token.                                                                                                                                                 |
| **NotifyX**        | **API Key**: Key                                                            | 1. Visit [NotifyX Official Site](https://www.notifyx.cn/).<br>2. Login to get your API Key.                                                                                                                                                              |
| **Resend** (Email) | **API Key**: Resend Key<br>**From**: Sender Email<br>**To**: Receiver Email | 1. Register at [Resend](https://resend.com/).<br>2. Bind a domain and get an API Key.<br>3. `From` must be a verified domain email (e.g., `alert@yourdomain.com`). If you don't have one, use `onboarding@resend.dev` and send to your registered email. |
| **Webhook**        | **URL**: POST URL                                                           | For custom development. The system sends a POST request: `{ "title": "...", "content": "..." }`.                                                                                                                                                         |

---

## 🛠 Usage

### Adding a Service

- **Name**: Service name (e.g., "Netflix 4K", "Google Voice - 8888").
- **Tags**: For categorization (e.g., `Media`, `Server`, `Domain`, `PhoneNumber`). Supports multiple tags.
- **Mode**:
  - 📅 **Cycle Subscription**: For items that expire every fixed cycle (e.g., 1 Month / 1 Year). Good for monthly subs, VPS renewals.
  - ⏳ **Expiration Reset**: For items that need manual/auto handling upon expiration to extend validity. Good for eSIM validity extension (e.g., extend 180 days on top-up).
- **Lunar Cycle**: Enable this for calculations based on the Lunar calendar (Birthdays, traditional events).
- **Automation Policy**:
  - **Auto-Renew**: Automatically extends the next due date by one cycle upon expiration.
  - **Auto-Disable**: Automatically marks the service as disabled if it remains overdue for a specified number of days.

<div align="center">
  <img src="./assets/AddUI_darkEN_shot.png" alt="RenewHelper 界面预览" width="600">
</div>

### Viewing Logs

Click the **LOGS** button on the main interface to view history of automation tasks, push results, and operation audits.

### ICS Calendar Subscription

Find the **Calendar Subscription** section in "Settings".

1.  Copy the subscription link.
2.  **iOS**: Settings -> Mail -> Accounts -> Add Account -> Other -> Add Subscribed Calendar.
3.  **Google Calendar**: Add calendar -> From URL.
4.  **Outlook**: Add Calendar -> Subscribe from web.
5.  **Note**: The link contains a security token. Do not share it. If leaked, click "Reset Token".

---

## ⚠️ Notes

1.  **Data Security**: All data is stored in your Cloudflare KV. It is recommended to manually export JSON backups regularly.
2.  **Free Tier Limits**:
    - Cloudflare Workers Free Tier is limited to 100,000 requests per day.
    - KV writes are limited to 1,000 per day.

---

## 🤝 Contribution & Support

If you find bugs or have feature suggestions, feel free to submit an Issue or Pull Request.

### 💖 Donation

If RenewHelper helps you, consider buying the author a coffee ☕️. Your support keeps the updates coming!

**Crypto** - International

| Crypto | Network | Address (Click to Copy) |
| :--- | :--- | :--- |
| **USDT** | **BSC (BEP20)** / Polygon / ETH | `0x0de4d19673cbdf954cfb83c0a48abb5ce8f6bf58` |

> ⚠️ Warning：Support USDT on BSC (BEP20), ETH or Polygon networks (Low fees).，DO NOT USE TRC20 ！！！

**Aifadian** - CN Users

[![爱发电](https://img.shields.io/badge/爱发电-Aifadian-946ce6?style=for-the-badge&logo=github&logoColor=white)](https://aifadian.com/a/lostfree)

---

**License**: MIT
Copyright (c) 2025 LOSTFREE
