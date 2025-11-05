"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Avatar from "@/components/common/Avatar";

function ProjectMembersModal({ lead, members, onClose, containerId }: TProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById(containerId));
  }, [containerId]);

  if (!container) return null;

  return createPortal(
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50 mt-8">
      <div className="w-[40rem] h-[28rem] bg-white rounded-3xl p-6 shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h6 className="font-extrabold text-2xl tracking-wide">
            Project Members
          </h6>
        </div>

        {/* Project Lead */}
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 mb-4">
          <h6 className="font-bold text-lg text-primary mb-3">Project Lead</h6>
          <div className="flex items-center gap-3">
            <Avatar firstName={lead?.first_name} lastName={lead?.last_name} />

            <div>
              <p className="font-semibold text-gray-800">
                {lead.first_name} {lead.last_name}{" "}
              </p>
              <p className="text-sm text-gray-600">ID: {lead.emp_id}</p>
              <p className="text-sm text-gray-600">
                Role: {lead.sub_role ?? lead.role}
              </p>
            </div>
          </div>
        </div>

        {/* Members Section (Scrollable) */}
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 flex-1 overflow-y-auto">
          <h6 className="font-bold text-lg text-primary mb-3">Team Members</h6>
          {members && members.length > 0 ? (
            <div className="flex flex-col gap-3">
              {members.map((member) => (
                <div
                  key={member.emp_id}
                  className="flex items-center gap-3 border-b border-gray-100 pb-2 last:border-none"
                >
                  <Avatar
                    firstName={member?.first_name}
                    lastName={member?.last_name}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {member.first_name} {member.last_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      ID: {member.emp_id} • Role:{" "}
                      {member.sub_role ?? member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">
              No members assigned to this project.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-5">
          <button
            onClick={onClose}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 font-semibold tracking-wide"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    container
  );
}

type TProps = {
  lead: any;
  members: any[];
  onClose: () => void;
  containerId: string;
};

export default ProjectMembersModal;
