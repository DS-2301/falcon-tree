import React from "react";
import Card from "../ui/Card";
import ProjectCard from "./ProjectCard";

function ProfileContent() {
  return (
    <div className="profile-content">
      <h2>Recent Projects</h2>
      <ProjectCard title="Project Alpha" description="A cool project" />
      <ProjectCard title="Project Beta" description="Another project" />
      <ProjectCard title="Project Gamma" description="Yet another one" />
    </div>
  );
}

export default ProfileContent;

