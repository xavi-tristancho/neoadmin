import { Header } from "@neoco/neoco-backoffice";
import { clone } from "../utils";
import { writers } from "./fixtures/writers";
import { Writer } from "./types";

const headers: Header = {
  type: "CRUD", // Specify the header as a `CRUD` type
  options: {
    name: "Writer", // Name the sidebar option and the page title
    route: { path: "/writers" }, // Specify the page url
    requests: {
      findRequest: () => Promise.resolve(clone(writers)),
      findOneRequest: ({ id }: { id: string }) => {
        return Promise.resolve(
          writers.find((writer) => writer.id === parseInt(id))
        );
      },
      upsertRequest: (item: Writer) => {
        if (item.id) {
          const index = writers.findIndex((writer) => writer.id === item.id);
          writers[index] = item;
          return Promise.resolve(writers[index]);
        } else {
          const nextItem: Writer = {
            ...item,
            id: writers.length + 1,
          };
          writers.push(nextItem);
          return Promise.resolve(nextItem);
        }
      },
      deleteRequest: ({ id }: { id: string }) => {
        const index = parseInt(id) - 1;
        writers.splice(index, 1);

        return Promise.resolve(writers);
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
          label: "Name",
          property: "name",
          type: "text",
        },
        {
          label: "Birthdate",
          property: "birthdate",
          type: "date",
        },
        {
          label: "Address",
          property: "address",
          type: "text",
        },
        {
          label: "Email ",
          property: "email",
          type: "email",
        },
        {
          property: "visible",
          tableOptions: {
            show: false,
          },
          type: "checkbox",
        },
      ],
    },
  ],
};

export default headers;
