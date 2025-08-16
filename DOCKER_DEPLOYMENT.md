# Docker Deployment with GitHub Actions

This project includes a GitHub Actions workflow that automatically builds the Angular application and pushes it to Docker Hub.

## Prerequisites

1. **Docker Hub Account**: You need a Docker Hub account to push images
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **GitHub Secrets**: You need to configure secrets in your GitHub repository

## Setup Instructions

### 1. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add the following secrets:

- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password or access token

**Note**: For better security, use a Docker Hub access token instead of your password:
1. Go to Docker Hub → Account Settings → Security
2. Create a new access token
3. Use this token as the `DOCKER_PASSWORD` secret

### 2. Repository Structure

The workflow expects the following files to be present in your repository:

```
├── .github/
│   └── workflows/
│       └── docker-build-push.yml
├── Dockerfile
├── nginx.conf
├── .dockerignore
├── package.json
├── angular.json
└── src/
```

### 3. Workflow Triggers

The workflow will run automatically on:
- **Push to main/master branch**: Builds and pushes the image
- **Pull requests**: Builds the image but doesn't push (for testing)
- **Tags starting with 'v'**: Creates versioned releases (e.g., v1.0.0)

## Workflow Details

### Build Process

1. **Checkout**: Clones the repository
2. **Node.js Setup**: Sets up Node.js 18 with npm caching
3. **Dependencies**: Installs npm dependencies
4. **Testing**: Runs Angular tests in headless Chrome
5. **Build**: Builds the Angular application for production
6. **Docker Build**: Creates a multi-stage Docker image
7. **Push**: Pushes the image to Docker Hub (only on pushes, not PRs)

### Image Tags

The workflow automatically creates multiple tags:
- `latest`: Latest build from main/master branch
- `{branch}-{sha}`: Branch-specific builds with commit SHA
- `{version}`: Semantic version tags (e.g., v1.0.0)
- `{major}.{minor}`: Major.minor version tags (e.g., 1.0)

### Docker Image Structure

The Docker image uses a multi-stage build:
- **Builder stage**: Node.js 18 Alpine with Angular build
- **Production stage**: Nginx Alpine serving the built application

## Usage

### Running the Workflow

1. **Automatic**: Push to main/master branch or create a tag
2. **Manual**: Go to Actions tab → Select workflow → Run workflow

### Pulling and Running the Image

```bash
# Pull the latest image
docker pull your-dockerhub-username/your-repo-name:latest

# Run the container
docker run -p 8080:80 your-dockerhub-username/your-repo-name:latest

# Access the application
open http://localhost:8080
```

### Using Specific Versions

```bash
# Pull a specific version
docker pull your-dockerhub-username/your-repo-name:v1.0.0

# Run with specific version
docker run -p 8080:80 your-dockerhub-username/your-repo-name:v1.0.0
```

## Customization

### Environment Variables

You can customize the workflow by modifying the environment variables in `.github/workflows/docker-build-push.yml`:

```yaml
env:
  REGISTRY: docker.io  # Change to your registry
  IMAGE_NAME: ${{ github.repository }}  # Change image name
```

### Build Arguments

To add build arguments to the Docker build, modify the workflow:

```yaml
- name: Build and push Docker image
  uses: docker/build-push-action@v5
  with:
    context: .
    file: ./Dockerfile
    push: ${{ github.event_name != 'pull_request' }}
    tags: ${{ steps.meta.outputs.tags }}
    labels: ${{ steps.meta.outputs.labels }}
    build-args: |
      BUILD_DATE=${{ github.event.head_commit.timestamp }}
      VCS_REF=${{ github.sha }}
```

### Nginx Configuration

The `nginx.conf` file is optimized for Angular applications with:
- Proper routing support (fallback to index.html)
- Gzip compression
- Security headers
- Static asset caching
- Health check endpoint

## Troubleshooting

### Common Issues

1. **Build Failures**: Check the Actions tab for detailed error logs
2. **Authentication Errors**: Verify Docker Hub credentials in secrets
3. **Test Failures**: Ensure all tests pass locally before pushing
4. **Image Push Failures**: Check Docker Hub rate limits and permissions

### Debugging

1. **Local Testing**: Test the Docker build locally:
   ```bash
   docker build -t your-app .
   docker run -p 8080:80 your-app
   ```

2. **Workflow Debugging**: Enable debug logging by adding this secret:
   - Name: `ACTIONS_STEP_DEBUG`
   - Value: `true`

## Security Considerations

1. **Secrets**: Never commit Docker credentials to the repository
2. **Base Images**: Regularly update base images for security patches
3. **Dependencies**: Keep npm dependencies updated
4. **Access Tokens**: Use Docker Hub access tokens instead of passwords

## Performance Optimization

1. **Caching**: The workflow uses GitHub Actions cache for npm dependencies
2. **Multi-stage Build**: Reduces final image size
3. **Dockerignore**: Excludes unnecessary files from build context
4. **Layer Caching**: Optimizes Docker layer caching

## Support

For issues with the workflow:
1. Check the GitHub Actions logs
2. Verify all prerequisites are met
3. Test the Docker build locally
4. Review the workflow configuration
