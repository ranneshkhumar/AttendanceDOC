# Fix npm Not Working in PowerShell

## The Problem
PowerShell's execution policy is preventing npm from running. This is a Windows security feature.

## Solutions

### Solution 1: Use Command Prompt (CMD) - Easiest ✅

1. **Open Command Prompt** (not PowerShell):
   - Press `Win + R`
   - Type `cmd` and press Enter
   - Or search for "Command Prompt" in Start menu

2. **Navigate to your project**:
   ```cmd
   cd C:\Users\HP\AttendanceDOC
   ```

3. **Run npm commands normally**:
   ```cmd
   npm install
   npm run dev
   ```

### Solution 2: Fix PowerShell Execution Policy (Permanent Fix)

1. **Open PowerShell as Administrator**:
   - Right-click on PowerShell
   - Select "Run as Administrator"

2. **Run this command**:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **Type `Y` when prompted**

4. **Close and reopen PowerShell**

5. **Now npm will work normally**:
   ```powershell
   npm install
   npm run dev
   ```

### Solution 3: Use PowerShell with Bypass (Temporary)

For each command, use:
```powershell
powershell -ExecutionPolicy Bypass -Command "npm install"
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

### Solution 4: Check Current Execution Policy

To see what your current policy is:
```powershell
Get-ExecutionPolicy
```

Common values:
- `Restricted` - No scripts allowed (your current issue)
- `RemoteSigned` - Local scripts OK, downloaded scripts need signature
- `Unrestricted` - All scripts allowed (less secure)

## Recommended: Use CMD for Now

The easiest solution is to use Command Prompt (CMD) instead of PowerShell. npm works perfectly in CMD without any configuration.

