import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { PageBlocksProjects } from "../../.tina/__generated__/types";
import Gallery from "../gallery/Gallery";

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
        width="large"
      >
        <TinaMarkdown content={data.body} />

        <div
          id="project-galleries"
          style={{ overflowX: "hidden", padding: "64px 0", width: "100%" }}
        >
          {data.projects.map((project, index) => {
            return (
              <Gallery key={index} data={project} />
            );
          })}
        </div>
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
          type: "rich-text",
          name: "summary",
          label: "Short Summary",
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
          name: "backgroundImages",
          label: "Background Images",
          list: true,
        },
        {
          type: "string",
          name: "thumbnailImages",
          label: "Thumbnail Images",
          list: true,
        },
      ],
    },
  ],
};
