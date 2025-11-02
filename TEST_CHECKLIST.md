# File Manager Testing Checklist

## How to Run
```bash
npm run start -- --username=testuser
```

## Requirements Testing

### 1. ✅ Program prompts and waits for commands
**Test:** After starting, you should see:
- Welcome message
- Current directory
- Then the program waits for your input (you can type commands)

**Expected:** Program waits for input without exiting

---

### 2. ✅ Invalid input handling
**Test Commands:**
- `unknowncommand` (unknown operation)
- `cat` (missing mandatory arguments)
- `cd` (missing path argument)
- `rn file.txt` (missing new filename)

**Expected Result:** 
- Shows "Invalid input"
- Shows current directory
- Program continues, ready for next command

---

### 3. ✅ Operation failed handling
**Test Commands:**
- `cat nonexistent.txt` (non-existent file)
- `cd /nonexistent/path` (non-existent directory)
- `rm nonexistent.txt` (non-existent file to delete)
- `cat /Users` (trying to read a directory instead of file)

**Expected Result:**
- Shows "Operation failed"
- Shows current directory  
- Program continues, ready for next command

---

### 4. ✅ Root directory protection
**Test Commands:**
- `up` (when already at root)
- `cd ..` (when at root)
- `cd /../../../../..` (try to go above root)

**Expected Result:**
- Current working directory doesn't change
- Still shows root directory
- No error (silently ignores)

---

### 5. ✅ Basic operations work
**Test Commands:**
- `ls` - Should list files and folders
- `cd <existing_directory>` - Should change directory
- `up` - Should go up one level
- `cat <existing_file>` - Should read and display file content
- `mkdir testdir` - Should create new directory
- `add testfile.txt` - Should create new file
- `rm testfile.txt` - Should delete file

**Expected Result:**
- Commands execute successfully
- Current directory shown after each operation

---

## Quick Test Sequence

1. Start application:
   ```bash
   npm run start -- --username=testuser
   ```

2. Test invalid input:
   ```
   unknowncommand
   ```
   Should show: "Invalid input"

3. Test operation failed:
   ```
   cat nonexistent.txt
   ```
   Should show: "Operation failed"

4. Test valid operation:
   ```
   ls
   ```
   Should show: List of files and directories

5. Test root protection:
   ```
   cd /
   up
   up
   up
   ```
   Should stay at root directory

6. Exit:
   ```
   .exit
   ```
   Should show: "Thank you for using File Manager, testuser, goodbye!"

---

## Verify Requirements Checklist

- [ ] Application accepts username and prints welcome message
- [ ] Application exits on `.exit` command with goodbye message
- [ ] Application exits on Ctrl+C with goodbye message
- [ ] Current directory shown at start
- [ ] Current directory shown after each operation
- [ ] Program prompts and waits for commands
- [ ] Unknown operations show "Invalid input"
- [ ] Missing arguments show "Invalid input"
- [ ] Invalid input doesn't crash application
- [ ] Non-existent files show "Operation failed"
- [ ] Non-existent paths show "Operation failed"
- [ ] Operation failed doesn't crash application
- [ ] Cannot go above root directory
- [ ] Application continues after errors

