import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { PageBlocksProjects } from "../../.tina/__generated__/types";

type ProjectsGalleryProps = { data: PageBlocksProjects; parentField?: string };

export const ProjectsGallery = (props: ProjectsGalleryProps) => {
  const { data, parentField = "" } = props;
  return (
    <Section color={data.color}>
      <Container
        className={`prose prose-lg ${
          data.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        data-tinafield={`${parentField}.body`}
        size="large"
        width="medium"
      >
        <TinaMarkdown content={data.body} />

        {data.projects.map((project, index) => {
          return (
            <div key={index}>
              <h2>{project.abstract}</h2>
              <p>{project.name}</p>
              <p>{project.short}</p>
              <p>{project.skills}</p>
              <p>{project.date}</p>
            </div>
          );
        })}
      </Container>
    </Section>
  );
};

export const projectsBlockSchema: Template = {
  name: "projects",
  label: "Projects Gallery",
  ui: {
    previewSrc: "/blocks/content.png",
  },
  fields: [
    {
      type: "rich-text",
      label: "Body",
      name: "body",
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
    {
      type: "object",
      list: true,
      name: "projects",
      label: "Projects",
      ui: {
        visualSelector: true,
      },
      fields: [
        {
          type: "string",
          name: "abstract",
          label: "Abstract Name",
          isTitle: true,
          required: true,
        },
        {
          type: "string",
          name: "name",
          label: "Project Name",
        },
        {
          type: "string",
          name: "short",
          label: "Short Description",
        },
        {
          type: "string",
          name: "skills",
          label: "Skills",
        },
        {
          type: "string",
          name: "date",
          label: "Rough Date",
        },
        {
          type: "string",
          name: "background",
          label: "Skills",
          list: true,
        },
        {
          type: "string",
          name: "thumbs",
          label: "Skills",
          list: true,
        },
        {
          type: "boolean",
          name: "feature",
          label: "Feature on Home Page",
        },
        {
          type: "rich-text",
          name: "body",
          label: "Body",
          isBody: true,
        },
      ],
    },
  ],
};
