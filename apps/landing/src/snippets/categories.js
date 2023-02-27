export default `// requests.js

export const getRequests = (endpoint) => ({
  findRequest: findRequest(endpoint),
  findAllRequest: findAllRequest(endpoint),
  mapFindResponse: ({ data }) => data,
  findOneRequest: findOneRequest(endpoint),
  upsertRequest: upsertRequest(endpoint),
  deleteRequest: deleteRequest(endpoint),
  countRequest: countRequest(endpoint),
});

// headers.js

//This same JSON is used for the table and form creation
import { getRequests, getStatistics } from "utils/requests";

const requests = getRequests("category");
const {views, popularity} = getStatistics();

const headers = {
  type: "CRUD",
  options: {
    name: "Categories",
    route: { path: "/categories" },
    requests,
    tableOptions: {
      isEditable: true,
      isDeletable: true,
      displayItemsPerPage: true, 
    },
  },
  sections: [
    {
      fields: [
        {
          label: "Title",
          property: "title",
        },
        {
          label: "URL",
          property: "slug",
          type: "slug",
        },
        {
          label: "Cover Image",
          property: "image",
          type: "image",
          tableOptions: {
            show: false, 
          },
        {
          label: "Author",
          property: "author",
        },
        {
          label: "Publish Date",
          property: "publisDate", 
          type: "date",
        },
        {
          label: "Total Views",
          property: "publisDate",
          upsertOptions: { 
            show: false,
          },
        },
        {
          label: "Status",
          property: "status",
          type: "select",
        },
        {
          label: "Popularity",
          property: "publisDate",
          upsertOptions: { 
            show: false,
          }, 
        },
        {
          label: "Content",
          property: "content",
          type: "wysiwyg",
        },
      ],
    },
  ],
};

export default headers;`;
