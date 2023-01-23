import { Container } from "../util/container";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { PageBlocksProjects } from "../../.tina/__generated__/types";
import Gallery from "../gallery/Gallery";
import { useState } from "react";
import { isWhiteSpaceLike } from "typescript";

type ProjectsGalleryProps = { data: PageBlocksProjects; parentField?: string };

export const ProjectsGallery = (props: ProjectsGalleryProps) => {
  const { data, parentField = "" } = props;

  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <Section color={data.color}>
      <Container
        className={`prose prose-lg px-0 ${
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
              <Gallery
                key={`${index}-${project.name}`}
                data={project}
                selected={index === selectedIndex}
                onClick={() =>
                  setSelectedIndex(index === selectedIndex ? -1 : index)
                }
                {...data}
              />
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
      type: "string",
      name: "urlBaseBackgroundImages",
      label: "URL base — Background Images",
    },
    {
      type: "string",
      name: "urlBaseThumbnailImages",
      label: "URL base — Thumbnail Images",
    },
    {
      type: "string",
      name: "urlBaseThumbnailVideos",
      label: "URL base — Thumbnail Videos",
    },
    {
      type: "object",
      list: true,
      name: "projects",
      label: "Projects",
      ui: {
        visualSelector: true,
        itemProps: (item) => {
          return {
            label: `⭐ ${item?.name}`,
            // style: {
            // // color: "white",
            // backgroundImage: `url(${item?.backgroundImages?.[0]})`,
            // backgroundSize: `cover`,
            // backgroundPosition: `center`,
            // // height: "64px",
            // backgroundColor: `#FFFD`,
            // backgroundBlendMosde: `screen`,
            // userSelect: "none",
            // },
          };
        },
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
          type: "object",
          name: "links",
          label: "Links",
          list: true,
          fields: [
            {
              type: "string",
              name: "name",
              label: "Name",
              isTitle: true,
              required: true,
              description: "How the link will be displayed",
              options: [{ label: "Website", value: "website" }],
            },
            {
              type: "string",
              name: "url",
              label: "URL",
              required: true,
              description: "Must be a valid URL",
              ui: {
                component: "url",
                visualSelector: true,
              },
            },
          ],
        },
        {
          type: "string",
          name: "backgroundImages",
          label: "Background Images",
          list: true,
        },
        // {
        //   type: "string",
        //   name: "thumbnailImages",
        //   label: "Thumbnail Images",
        //   list: true,
        // },
        {
          type: "string",
          name: "thumbnails",
          label: "Thumbnail Images & Videos",
          list: true,
        },
        {
          type: "string",
          name: "extraThumbnails",
          label: "Thumbnail Images Only",
          list: true,
        },
      ],
    },
  ],
};
