
import { useState, useEffect } from 'react';
import { getAdminById } from '@/app/(frontend)/lib/admin';

export function useAgentData(agent: any) {
  const [agentData, setAgentData] = useState<any>(null);

  useEffect(() => {
    const fetchAgentData = async (agentId: string) => {
      try {
        const data = await getAdminById(agentId);
        setAgentData(data);
      } catch (error) {
        console.error("Failed to fetch agent data", error);
      }
    };

    if (agent) {
      if (typeof agent === 'string') {
        fetchAgentData(agent);
      } else {
        setAgentData(agent);
      }
    }
  }, [agent]);

  return agentData;
}
