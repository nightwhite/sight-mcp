# GitHub Actions CI/CD Setup

This repository includes automated GitHub Actions workflows for testing, building, and publishing the MCP server.

## Workflows

### 1. CI/CD Pipeline (`.github/workflows/ci.yml`)

Automated pipeline that runs on:
- **Push to main/master**: Runs tests and builds
- **Pull requests**: Runs full test suite
- **Releases**: Builds and publishes to NPM

**Jobs:**
- **test**: Runs unit and integration tests with Bun
- **build**: Builds the executable binary
- **publish**: Publishes to NPM (only on releases)

### 2. Release Automation (`.github/workflows/release.yml`)

Manual workflow for creating releases:
- **Manual trigger**: Specify version and prerelease status
- **Creates GitHub release** with changelog
- **Uploads release assets**: Executable and platform packages
- **Publishes to NPM** with proper versioning

## Required Secrets

Configure these in your GitHub repository settings:

### NPM_TOKEN
- **Required for**: Publishing to NPM
- **How to get**:
  1. Go to [npmjs.com](https://www.npmjs.com)
  2. Account settings → Access Tokens → Generate new token
  3. Select "Automation" permissions
  4. Add token to GitHub repo secrets

### GITHUB_TOKEN
- **Automatically provided** by GitHub Actions
- **Permissions needed**:
  - Contents: Read/Write (for releases)
  - Actions: Read (for artifacts)

## Usage

### Automatic Publishing (Recommended)

1. **Create a new release on GitHub**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **GitHub Actions will automatically**:
   - Run all tests
   - Build the project
   - Create GitHub release
   - Publish to NPM

### Manual Publishing

1. **Go to Actions tab in GitHub**
2. **Select "Release Automation" workflow**
3. **Click "Run workflow"**
4. **Enter version** (e.g., `1.0.1`)
5. **Choose prerelease** if needed
6. **Workflow will**:
   - Create GitHub release
   - Upload assets
   - Publish to NPM

## Installation for Users

After publishing, users can install:

### From NPM (Recommended)
```bash
npm install -g sight-mcp
# or specific version
npm install -g sight-mcp@1.0.0
```

### From GitHub Releases
```bash
# Download the executable from releases
wget https://github.com/nightwhite/sight-mcp/releases/latest/download/sight-mcp
chmod +x sight-mcp
sudo mv sight-mcp /usr/local/bin/
```

## Configuration for Claude Desktop

Users need to add to their Claude Desktop config:

```json
{
  "mcpServers": {
    "sight-mcp": {
      "command": "sight-mcp",
      "env": {
        "OPENAI_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

## Troubleshooting

### Build Failures
- Check Bun version compatibility
- Verify all dependencies install correctly
- Review test logs for failures

### NPM Publishing Failures
- Verify `NPM_TOKEN` is valid and has publish permissions
- Check package.json has correct fields (main, bin, files)
- Ensure version doesn't already exist on NPM

### Release Issues
- Verify GITHUB_TOKEN has necessary permissions
- Check that tag follows semantic versioning (v1.2.3)
- Ensure release notes don't exceed GitHub limits

## Development Workflow

1. **Feature development** on feature branches
2. **Pull requests** trigger tests automatically
3. **Merge to main** after review
4. **Create release** to trigger publishing
5. **Monitor actions** for any issues

## Security

- **NPM_TOKEN** is encrypted and only used during publishing
- **No sensitive data** in build artifacts
- **Dependencies scanned** automatically by GitHub
- **Code reviews** required for all changes