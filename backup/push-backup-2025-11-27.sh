#!/bin/sh
# Script to push backup branch to remote
remoteName=${1:-advanced}
branchName=${2:-backup/full-2025-11-27}

echo "Pushing backup branch $branchName to remote $remoteName"
git push $remoteName $branchName:refs/heads/$branchName
