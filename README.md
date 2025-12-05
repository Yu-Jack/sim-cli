# sim-gui

A web-based UI for managing and exploring Harvester support bundles. This application provides an intuitive interface to upload, analyze, and navigate through support bundle contents.

## Features

- Upload and manage multiple support bundle workspaces
- Browse support bundle structure (logs, yamls, nodes, etc.)
- View resource history and changes
- Interactive file explorer
- RESTful API backend

## Prerequisites

- Go 1.22.5 or later
- Node.js 22.x
- Docker (for containerized builds)

## Building

### Quick Build

Build both the UI and the Go binary:

```bash
make build
```

This will:
1. Install UI dependencies
2. Build the UI assets
3. Copy built assets to `pkg/server/static/`
4. Build the Go binary for multiple platforms (linux-amd64, linux-arm64, darwin-arm64)
5. Output binaries to `bin/` directory

### Manual Build

Build UI only:
```bash
cd ui
npm install
npm run build
```

Build Go binary only:
```bash
go build -o bin/sim-gui main.go
```

## Development

### Backend Development

Run the server without serving static UI files (for frontend development):

```bash
go run main.go server --dev
```

Options:
- `--addr`: Server address (default: `:8080`)
- `--data-dir`: Directory to store data (default: `./data`)
- `--dev`: Enable dev mode (do not serve static files)

### Frontend Development

Start the Vite dev server for hot-reload development:

```bash
cd ui
npm run dev
```

The UI will be available at `http://localhost:5173` and will proxy API requests to `http://localhost:8080`.

Make sure the backend is running in dev mode:
```bash
go run main.go server --dev
```

### Full Stack Development Workflow

1. Terminal 1: Start backend in dev mode
   ```bash
   go run main.go server --dev
   ```

2. Terminal 2: Start frontend dev server
   ```bash
   cd ui
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

## Running in Production

After building, run the binary with embedded UI:

```bash
./bin/sim-gui-linux-amd64 server
```

The server will serve both the API and the UI at `http://localhost:8080`.

## Project Structure

```
.
├── pkg/
│   ├── server/          # HTTP server and API handlers
│   │   ├── api/         # API routes and handlers
│   │   ├── model/       # Data models
│   │   ├── store/       # Data storage layer
│   │   └── static/      # Embedded UI assets (generated)
│   ├── docker/          # Docker client utilities
│   └── kubeconfig/      # Kubeconfig utilities
├── ui/                  # React frontend application
│   ├── src/
│   │   ├── api/         # API client
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── types/       # TypeScript types
│   └── dist/            # Built UI assets (generated)
└── scripts/             # Build and CI scripts
```

## API Endpoints

- `GET /api/workspaces` - List all workspaces
- `POST /api/workspaces` - Create a new workspace
- `GET /api/workspaces/{name}` - Get workspace details
- `DELETE /api/workspaces/{name}` - Delete a workspace
- `PUT /api/workspaces/{name}` - Rename a workspace
- `POST /api/workspaces/{name}/resource-history` - Get resource history
- `GET /api/workspaces/{name}/namespaces` - List namespaces
- `GET /api/workspaces/{name}/resource-types` - List resource types
- `GET /api/workspaces/{name}/resources` - Get resources