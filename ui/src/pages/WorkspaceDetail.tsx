import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getWorkspace, getSimulatorStatus } from '../api/client';
import type { Workspace } from '../types';
import { UploadArea } from '../components/workspace/UploadArea';
import { VersionList } from '../components/workspace/VersionList';
import { ResourceHistory } from '../components/workspace/ResourceHistory';

export const WorkspaceDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [statuses, setStatuses] = useState<Record<string, { running: boolean; ready: boolean }>>({});

  const loadWorkspace = useCallback(async () => {
    if (!name) return;
    try {
      const data = await getWorkspace(name);
      setWorkspace(data);
    } catch (error) {
      console.error('Failed to load workspace', error);
    }
  }, [name]);

  const loadStatuses = useCallback(async () => {
    if (!name || !workspace) return;
    const newStatuses: Record<string, { running: boolean; ready: boolean }> = {};
    for (const version of workspace.versions) {
      try {
        const status = await getSimulatorStatus(name, version.id);
        newStatuses[version.id] = status;
      } catch (error) {
        console.error(`Failed to load status for ${version.id}`, error);
      }
    }
    setStatuses(newStatuses);
  }, [name, workspace]);

  useEffect(() => {
    const init = async () => {
      await loadWorkspace();
    };
    init();
  }, [loadWorkspace]);

  useEffect(() => {
    if (workspace) {
      const initStatus = async () => {
        await loadStatuses();
      };
      initStatus();
      const interval = setInterval(loadStatuses, 5000); // Poll every 5 seconds
      return () => clearInterval(interval);
    }
  }, [workspace, loadStatuses]);

  if (!workspace || !name) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Workspace: {workspace.name}</h1>
      </div>

      <UploadArea workspaceName={name} onUploadComplete={loadWorkspace} />

      <VersionList
        workspace={workspace}
        statuses={statuses}
        onRefresh={() => {
          loadWorkspace();
          loadStatuses();
        }}
      />

      <ResourceHistory workspaceName={name} />
    </div>
  );
};

