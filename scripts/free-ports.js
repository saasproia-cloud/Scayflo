/**
 * Stops anything using port 3000 and removes Next.js dev lock.
 * Run: npm run reset
 * Then run: npm run dev
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const isWindows = process.platform === "win32";
const port = 3000;
const nextLockPath = path.join(__dirname, "..", ".next", "dev", "lock");

// Kill process on port 3000
try {
  if (isWindows) {
    try {
      const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
      const lines = out.trim().split("\n").filter((l) => l.includes("LISTENING"));
      const pids = new Set();
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && /^\d+$/.test(pid)) pids.add(pid);
      }
      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: "pipe" });
          console.log("Stopped process on port 3000 (PID " + pid + ").");
        } catch (_) {}
      }
      if (pids.size === 0) console.log("Port 3000 is free.");
    } catch (err) {
      if (err.status === 1) console.log("Port 3000 is free.");
    }
  } else {
    execSync(`lsof -ti :${port} | xargs kill -9 2>/dev/null || true`, { stdio: "inherit" });
    console.log("Port 3000 cleared.");
  }
} catch (e) {
  console.log("Port 3000:", e.message || "ok.");
}

// Remove Next.js lock so dev can start
try {
  if (fs.existsSync(nextLockPath)) {
    fs.unlinkSync(nextLockPath);
    console.log("Next.js lock removed.");
  }
} catch (e) {
  console.log("Lock:", e.message || "ok.");
}

console.log("\nNow run:  npm run dev");
console.log("Then open:  http://localhost:3000\n");
