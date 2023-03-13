import { Header } from "@neoco/neoco-backoffice";
import { clone } from "../utils";
import { posts, categories } from "./fixtures/posts";
import { Category, Post } from "./types";

const headers: Header = {
  type: "CRUD", // Specify the header as a `CRUD` type
  options: {
    name: "Post", // Name the sidebar option and the page title
    route: { path: "/posts", home: true }, // Specify the page url
    requests: {
      findRequest: () => Promise.resolve(clone(posts)),
      findOneRequest: ({ id }: { id: string }) => {
        return Promise.resolve(posts.find((post) => post.id === parseInt(id)));
      },
      upsertRequest: (item: Post) => {
        if (item.id) {
          const index = posts.findIndex((post) => post.id === item.id);
          posts[index] = item;
          return Promise.resolve(posts);
        } else {
          const nextItem: Post = {
            ...item,
            id: posts.length + 1,
          };
          posts.push(nextItem);
          return Promise.resolve(nextItem);
        }
      },
      deleteRequest: ({ id }: { id: string }) => {
        const index = parseInt(id) - 1;
        posts.splice(index, 1);

        return Promise.resolve(posts);
      },
    },
    tableOptions: {
      isEditable: true, // Enable edit rows
      isDeletable: true, // Enable delete rows
    },
  },
  sections: [
    {
      fields: [
        {
          label: "Image",
          property: "image",
          type: "image",
        },
        {
          label: "Title",
          property: "title",
          type: "text",
        },
        {
          label: "Date",
          property: "date",
          type: "date",
        },
        {
          label: "Content",
          property: "content",
          type: "html",
        },
        {
          label: "Category",
          property: "category",
          type: "multiselect",
          relation: {
            isMulti: false,
            options: categories,
            format: (category: Category) => category.name,
          },
          tableOptions: {
            format: (category: Category) => category.name,
          },
        },
        {
          property: "visible",
          tableOptions: {
            show: false,
          },
          type: "checkbox",
        },
        {
          label: "Minutage",
          property: "minutes",
          name: "minutes",
          type: "relation-list",
          tableOptions: {
            show: false,
          },
          options: {
            isCreatable: true,
            fields: [
              {
                property: "name",
                label: "Nombre",
              },
              {
                property: "time",
                label: "Minuto",
                type: "time",
                step: 1,
              },
            ],
          },
          style: {
            flexBasis: "100%",
          },
        },
      ],
    },
  ],
};

export default headers;
