import { create } from 'zustand';

interface Workspace {
    id: string;
    workspaceName: string;
    description: string;    
    userId: string;
}

interface WorkspaceStore {
    workspaces: Workspace[];
    selectedWorkspace: Workspace | null;
    setWorkspaces: (workspaces: Workspace[]) => void;
    setSelectedWorkspace: (workspace: Workspace) => void;
}


const useWorkspaceStore = create<WorkspaceStore>()((set) => ({
    workspaces: [],
    selectedWorkspace: null,
    setWorkspaces: (workspaces) => set({ workspaces }),
    setSelectedWorkspace: (workspace) => set({ selectedWorkspace: workspace }),
}))

export default useWorkspaceStore;