<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Deployment Workflow — MANDATORY

**NEVER push directly to `main`.** Always follow this flow:

1. Push changes to `alpha` branch
2. Wait for user to verify at https://alpha.passby.cooltreedan.org
3. Only after user confirms → create PR (alpha → main) → merge

```
改代码 → push origin alpha
              ↓
   alpha.passby.cooltreedan.org 自动预览
              ↓
      等用户确认"没问题"
              ↓
   PR (alpha → main) → merge
              ↓
   passby.cooltreedan.org 自动更新
```

Pushing to `main` directly skips the user's verification step. This is a workflow violation even if the change seems safe.
