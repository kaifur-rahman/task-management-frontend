"use client";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getMembersForProjectAction } from "@/actions/user/getMembersforProject";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

export default function SelectMembersInput({
  data,
  onChange,
}: SelectMembersInputProps) {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState<string[]>(data ?? []);

  //fetches memeber list
  useEffect(() => {
    getMembersForProjectAction().then(({ success, data }) => {
      if (success) setMembers(data);
      setLoading(false);
    });
  }, []);

  //initialize selected memebers
  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedMembers(data.map((member: any) => member.emp_id));
    }
  }, [data]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedMembers(typeof value === "string" ? value.split(",") : value);
    if (onChange)
      onChange(typeof value === "string" ? value.split(",") : value);
  };

  const getStyles = (emp_id: string) => ({
    fontWeight: selectedMembers.includes(emp_id) ? 600 : 400,
  });

  if (loading)
    return (
      <select
        disabled
        className="w-full border border-primary rounded-sm h-10 p-2 text-gray-500"
      >
        <option>Loading members...</option>
      </select>
    );
  return (
    <FormControl sx={{ width: "100%", mb: "1rem" }}>
      <InputLabel id="select-members-label" sx={{ color: "#8b8b8b!important" }}>
        Select Members
      </InputLabel>
      <Select
        name="projectMembers"
        labelId="select-members-label"
        required
        multiple
        value={selectedMembers}
        onChange={handleChange}
        input={
          <OutlinedInput
            id="select-multiple-chip"
            label="Select Members"
            sx={{
              borderRadius: 1,
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                color: "#000000",
                borderColor: "#FAA325",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                color: "#000000",
                borderColor: "#e59400",
              },
            }}
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((emp_id) => {
              const member = members.find((m) => m.emp_id === emp_id);
              return (
                <Chip
                  key={emp_id}
                  label={
                    member
                      ? `${member.first_name} ${
                          member?.last_name != null ? member.last_name : ""
                        }`
                      : emp_id
                  }
                  sx={{
                    backgroundColor: "#F0F0F0",
                    color: "#000000",
                    fontWeight: 500,
                  }}
                />
              );
            })}
          </Box>
        )}
        MenuProps={MenuProps}
        sx={{
          mb: "1rem",
          color: "#000000",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#faa325",
          },
          "& .MuiSelect-select": {
            padding: "10px",
          },
          "& .MuiMenuItem-root": {
            "&:hover": {
              backgroundColor: "#ffe0b2",
            },
            "&.Mui-selected": {
              backgroundColor: "#ffbf66 !important",
              color: "#000000",
            },
          },
        }}
      >
        {members.map((member) => (
          <MenuItem
            key={member.emp_id}
            value={member.emp_id}
            style={getStyles(member.emp_id)}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#F0F0F0 !important",
                color: "#000000",
              },
              ":hover": { color: "", backgroundColor: "#FFEDD9" },
            }}
          >
            {member.emp_id} {member.first_name} {member.last_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

type SelectMembersInputProps = {
  data?: any;
  onChange?: (selected: string[]) => void;
};
