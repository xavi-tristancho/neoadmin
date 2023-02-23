---
id: headers
title: Headers
sidebar_label: Basic Examples
---

Headers are a declarative way that we use to tell the neoAdmin what do we want to achieve in our UI/UX. It's the main structure that we are going to use to define how and what a table or form has to look like or do.

## Example

```js
import { DateTime } from "luxon";

const formatDate = (item, value) =>
  DateTime.fromISO(value).toFormat("dd/MM/yyyy HH:mm");

const headers = {
  type: "CRUD",
  options: {
    name: "Time Entries",
    route: "/time-entries",
    requests: {
      findRequest: () => {},
      findOneRequest: () => {},
      upsertRequest: () => {},
      deleteRequest: () => {},
      countRequest: () => {},
    },
    tableOptions: {
      displayItemsPerPage: false,
      isEditable: true,
      isDeletable: true,
    },
    upsertOptions: {},
  },
  sections: [
    {
      title: "Principal",
      fields: [
        {
          label: "Fecha Inicio",
          property: "start",
          tableOptions: {
            format: formatDate,
          },
        },
      ],
    },
  ],
};

export default headers;
```

---
