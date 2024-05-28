"use client";

import { useState } from "react";

export default function SelectRole({ roles }: { roles: string[] }) {
  if (roles.length === 0) return null;

  const [roleState, setRoleState] = useState(roles[0]);

  const handleRoleChange = (e: any) => {
    setRoleState(e.target.value);
  };

  return (
    <div className="flex mt-8">
      {roles.map((role) => {
        const title = role.charAt(0).toUpperCase() + role.slice(1);
        return (
          <div className="mx-4" key={role}>
            <label
              className="inline-flex items-center"
              onClick={handleRoleChange}
            >
              <input
                type="radio"
                className="form-radio text-blue-600"
                name="role"
                value={role}
                defaultChecked={role === "doctor"}
              />
              <span
                className={`ml-2 ${roleState === role ? "text-sky-600 font-semibold" : ""}`}
              >
                {title}
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
