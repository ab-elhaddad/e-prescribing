"use client";

import { useState } from "react";
import { clsx } from 'clsx';

export default function SelectRole({ roles }: { roles: string[] }) {
  const [roleState, setRoleState] = useState<string | null>(null);
  
  if (roles.length === 0) return null;
  setRoleState(roles[0]);

  const handleRoleChange = (e: any) => {
    setRoleState(e.target.value);
  };

  return (
    <div className="flex mt-8">
      {roles.map((role) => {
        const title = role.charAt(0).toUpperCase() + role.slice(1);
        return (
          <div
            className={clsx(
              "mx-4 py-1 px-4 rounded-full bg-gray-100",
              {
                "bg-sky-100": roleState === role,
              }
            )}
            key={role}
          >
            <label
              className="inline-flex items-center cursor-pointer"
              onClick={handleRoleChange}
            >
              <input
                type="radio"
                className="form-radio text-blue-600 hidden"
                name="role"
                value={role}
                defaultChecked={role === "doctor"}
              />
              <span className={clsx('text-sm', { "text-sky-600": roleState === role })}>
                {title}
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
