# 部署指南 (Deployment Guide) - Vercel

本指南將協助您將網站部署到 Vercel (全球最大的 Next.js 免費託管平台)。

## 步驟 1：準備 Vercel 帳號
1. 前往 [Vercel](https://vercel.com/)。
2. 點擊 "Sign Up"，選擇使用 **GitHub** 登入 (推薦) 或 Email 註冊。

## 步驟 2：準備雲端資料庫 (Vercel Postgres)
因為 Vercel 無法儲存 SQLite 檔案，我們需要一個雲端資料庫。
1. 在 Vercel Dashboard 點擊 "Storage" -> "Create Database" -> 選 "Postgres"。
2. 給資料庫一個名字 (例如 `homepot-db`)，Region 選 `Singapore` (新加坡，離台灣最近) 或 `Washington D.C.` (美東，最穩定)。
3. 建立後，進入該資料庫頁面，點擊 `.env.local` 標籤頁。
4. 複製那一串環境變數 (包含 `POSTGRES_URL`, `POSTGRES_PRISMA_URL` 等)。

## 步驟 3：修改程式碼設定 (切換到 Postgres)
回到您的開發環境 (VSCode)：

1. 打開 `prisma/schema.prisma` 檔案。
2. 修改 `datasource db` 部分：
   ```prisma
   // 原本是 sqlite
   // provider = "sqlite"
   // url      = "file:./dev.db"

   // 修改為 postgresql
   provider = "postgresql"
   url      = env("POSTGRES_PRISMA_URL") // Vercel 會自動填入
   directUrl = env("POSTGRES_URL_NON_POOLING") // 用於 Migration
   ```
3. 刪除 `migrations` 資料夾 (因為 SQLite 和 Postgres 語法不同，重新產生較保險)。
   - 刪除 `prisma/migrations` 資料夾。

## 步驟 4：推送程式碼到 GitHub
1. 建立一個新的 GitHub Repository (例如 `homepot-web`)。
2. 將您的程式碼 Push 上去。

## 步驟 5：在 Vercel 建立專案
1. 回到 Vercel Dashboard，點擊 "Add New..." -> "Project"。
2. 匯入您剛剛的 GitHub Repository (`homepot-web`)。
3. **重要：設定環境變數 (Environment Variables)**：
   - 展開 "Environment Variables" 區塊。
   - 點擊 "Retrieve Environment Variables from..." 並選擇剛剛建立的 Database (`homepot-db`)。
   - Vercel 會自動把連線字串帶入。
4. 點擊 **Deploy**。

## 步驟 6：初始化資料庫
部署完成後，網站可能會顯示錯誤，因為資料庫還是空的。我們需要執行 Migration。
1. 在 Vercel 該專案頁面，上方選單點 "Settings" -> "General" -> "Build & Development Settings"。
2. 在 "Build Command" 欄位開啟 "Override"，輸入：
   ```bash
   prisma generate && prisma migrate deploy && next build
   ```
   *(這會確保每次部署時都自動更新資料庫結構)*
3. 重新部署一次 (Redeploy)。

## 步驟 7：設定圖片儲存 (Vercel Blob) - *選用*
如果您希望圖片上傳功能在雲端可用：
1. Vercel Dashboard -> Storage -> Create -> Blob。
2. 連結到您的專案。
3. 重新部署，系統會自動獲得 `BLOB_READ_WRITE_TOKEN`，上傳功能就會自動切換到雲端。

---
完成！您的網站現在應該可以在 `https://homepot-web.vercel.app` 這樣的網址上被全世界訪問了。
