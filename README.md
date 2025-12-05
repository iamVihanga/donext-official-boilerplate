1. _Add: Initial Commit_

2. Future Workflow
   **Milestone 01**

   - Checkout to: "worker-only" branch - ✅
   - Complete "worker-only" version with Core Package Setup - ✅
   - Deploy to cloudflare Workers (Name: nextplate-worker-only) - ✅
   - Validate and Finalize "worker-only" (Commit: Milestone 01 - Complete) - ✅

   **Milestone 02**

   - Checkout to "no-apps" branch
   - Merge latest changes from "worker-only"
   - Clear all application from apps/ and keep core package only
   - Validate and Finalize "no-apps" (Commit: Milestone 02 - Complete)

   **Milestone 03**

   - Create new branch from "no-apps" called "fullstack"
   - Add this cloudflare project: "web-app"
   - Complete NextJS + Hono Full stack application
   - Deploy to Cloudflare Pages /or workers (Name: nextplate-fullstack)
   - validate and Finalize "fullstack" (Commit: Milestone 03 - Complete)

   **Milestone 04**

   - Checkout to "no-apps"
   - Create new branch "enterprise"
   - Add these projects as Requirement
     - worker (Try to merge from worker-only first)
     - frontend (frontend Application with NextJS for Landing Pages / Blog Application etc.)
       - example.com
     - Ex: doc (for documentation), dashboard (for Single Page Apps)
       - doc.example.com / dashboard.example.com
   - Complete all Deployments
   - Validate and Finalize "enterprise" version (Commit: Milestone 04 - Complete)
