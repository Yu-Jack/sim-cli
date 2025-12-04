import type { Workspace } from '../types';

/**
 * Get the display name for a workspace.
 * If displayName exists and differs from name, returns "DisplayName (Name)".
 * Otherwise returns displayName or name.
 */
export const getWorkspaceDisplayName = (workspace: Workspace): string => {
  if (workspace.displayName && workspace.displayName !== workspace.name) {
    return `${workspace.displayName} (${workspace.name})`;
  }
  return workspace.displayName || workspace.name;
};

/**
 * Get the editable display name for a workspace (without the ID suffix).
 * Returns just the displayName or name value.
 */
export const getWorkspaceEditableName = (workspace: Workspace): string => {
  return workspace.displayName || workspace.name;
};
