# Backup summary 2025-11-27

Branch created as a snapshot: `backup/full-2025-11-27`

Files generated (under `backup/`):
- `BACKUP_INFO-2025-11-27.md` (committed) - metadata about the snapshot
- `RESTORE-2025-11-27.md` (committed) - restore instructions
- `push-backup-2025-11-27.ps1` (committed) - PowerShell script to push branch
- `push-backup-2025-11-27.sh` (committed) - Bash script to push branch
- `backup-full-2025-11-27.bundle` (untracked) - Git bundle with `--all` (all refs & tags)
- `backup-full-2025-11-27.zip` (untracked) - Zip snapshot of the backup branch

Recommended push procedure:

# 1) Push only the snapshot branch (safe)
# SSH (recommended):
# git push advanced backup/full-2025-11-27:refs/heads/backup/full-2025-11-27

# 2) Push all refs using the bundle (if you want to restore everything):
# git clone backup/backup-full-2025-11-27.bundle repo-backup
# cd repo-backup
# git remote add advanced git@github.com:Victordaz07/app-misional-avanzada.git
# git push advanced --all --tags

# Notes
- The push requires write access to the `app-misional-avanzada` repo.
- You can switch remote to HTTPS to use PAT authentication:
# git remote set-url advanced https://github.com/Victordaz07/app-misional-avanzada.git

