import { Header } from "@app-artisans/backoffice";
import { clone } from "../utils";
import { posts, categories } from "./fixtures/posts";
import { Category, Post } from "./types";
// import renderCellExpand from '@app-artisans/backoffice/src/components/ModelTable/components/RenderCellExpand';

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
          tableOptions: {
            format: ({ row }: { row: Post }) => (
              <img
                src={row.image}
                alt={row.title}
                style={{
                  aspectRatio: "16/9",
                  height: "90%",
                }}
              />
            ),
          },
        },
        {
          label: "Title",
          property: "title",
          type: "text",
          tableOptions: {
            format: ({ row }: { row: Post }) => <p>{row.title}</p>,
          },
        },
        {
          label: "Date",
          property: "date",
          type: "date",
          tableOptions: {
            format: ({ row }: { row: Post }) => <p>{row.date}</p>,
          },
        },
        {
          label: "Content",
          property: "content",
          type: "html",
          // tableOptions: {
          //   format: ({ row, props }: { row: Post, props: unknown }) => renderCellExpand(row, props),
          // },
        },
        {
          label: "Category",
          property: "category",
          type: "singleSelect",
          tableOptions: {
            format: ({ category }: { category: Category }) => (
              <p>{category.name}</p>
            ),
          },
          // getOptionValue: (value: any) => value.id,
          // getOptionLabel: (value: any) => value.name,
          valueOptions: categories,
          editable: true,
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
