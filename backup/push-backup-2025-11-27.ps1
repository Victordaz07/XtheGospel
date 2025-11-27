# PowerShell script to push backup branch to remote
param(
  [string]$remoteName = "advanced",
  [string]$branchName = "backup/full-2025-11-27"
)

# Attempt SSH push (recommended if you have SSH key configured):
Write-Host "Attempting SSH push to $remoteName for branch $branchName"
git push $remoteName $branchName:refs/heads/$branchName

# To use HTTPS instead, run the following commands manually:
# git remote set-url $remoteName https://github.com/Victordaz07/app-misional-avanzada.git
# git push $remoteName $branchName:refs/heads/$branchName
