import { getLevels, treeParser } from "./treeParser";

const getLevelsHightlights = (levels) => (position) =>
  levels[position]?.highlight;

const fullSchema = [
  {
    isConnected: true,
    title: "pages",
    type: "folder",
    children: [
      {
        title: "products",
        type: "folder",
        children: [
          {
            title: "header.js",
            type: "file",
          },
          {
            title: "index.js",
            type: "file",
          },
        ],
      },
    ],
  },
  {
    other: true,
  },
];

const getSchemaHighlight = ({
  highlightType = "all",
  showHighlightChildren = false,
} = {}) => [
  {
    isConnected: true,
    title: "pages",
    type: "folder",
    children: [
      {
        title: "products",
        type: "folder",
        highlight: highlightType,
        children: [
          {
            title: "header.js",
            type: "file",
            ...(showHighlightChildren ? { highlight: false } : {}),
          },
          {
            title: "index.js",
            type: "file",
          },
        ],
      },
    ],
  },
  { other: true },
];

describe("regarding the getLevels function", () => {
  describe("given a schema", () => {
    describe("regarding levels", () => {
      it("should return an array of objects each corresponding to a level", () => {
        const connectedLevels = [];
        const levels = getLevels({
          schema: fullSchema,
          connectedLevels,
        });

        expect(levels[0]).toStrictEqual({
          title: "pages",
          depth: 0,
          type: "folder",
          highlight: false,
          isDepthFirstChild: true,
          isDepthLastChild: false,
        });

        expect(levels[1]).toStrictEqual({
          title: "products",
          depth: 1,
          type: "folder",
          highlight: false,
          isDepthFirstChild: true,
          isDepthLastChild: true,
        });

        expect(levels[3]).toStrictEqual({
          title: "index.js",
          depth: 2,
          type: "file",
          highlight: false,
          isDepthFirstChild: false,
          isDepthLastChild: true,
        });
      });
    });

    describe("regarding the highlighted lines", () => {
      it("should return an array of objects and each object shoud contain a highlight prop", () => {
        const connectedLevels = [];
        const levels = getLevels({
          schema: fullSchema,
          connectedLevels,
        });
        const leHi = getLevelsHightlights(levels);

        expect([leHi(0), leHi(1), leHi(3)]).toStrictEqual([
          false,
          false,
          false,
        ]);
      });

      describe("given a property 'highlight: all'", () => {
        it("should return a 'highlight: true' property in the element that contains the prop 'highlight: all' and all it's childrens", () => {
          const schema = getSchemaHighlight();
          const levels = getLevels({
            schema,
            connectedLevels: [],
          });
          const leHi = getLevelsHightlights(levels);

          expect([leHi(0), leHi(1), leHi(3)]).toStrictEqual([
            false,
            true,
            true,
          ]);
        });
      });

      describe("given a property 'highlight: children'", () => {
        it("should return a 'highlight: true' property in all it's childrens", () => {
          const schema = getSchemaHighlight({ highlightType: "children" });
          const levels = getLevels({
            schema,
            connectedLevels: [],
          });
          const leHi = getLevelsHightlights(levels);

          expect([leHi(0), leHi(1), leHi(2), leHi(3)]).toStrictEqual([
            false,
            false,
            true,
            true,
          ]);
        });
      });

      describe("given a property 'highlight: line'", () => {
        it("should return a 'highlight: true' property in the element that contains the prop 'highlight: all'", () => {
          const schema = getSchemaHighlight({ highlightType: "line" });
          const levels = getLevels({
            schema,
            connectedLevels: [],
          });
          const leHi = getLevelsHightlights(levels);

          expect([leHi(0), leHi(1), leHi(2), leHi(3)]).toStrictEqual([
            false,
            true,
            false,
            false,
          ]);
        });
      });

      describe("given a property 'highlight: false'", () => {
        it("should return a 'highlight: false' property in the element that contains the prop 'highlight: false'", () => {
          const schema = [
            {
              isConnected: true,
              title: "pages",
              type: "folder",
              highlight: false,
            },
          ];

          const levels = getLevels({
            schema,
            connectedLevels: [],
          });

          expect(levels[0]?.highlight).toStrictEqual(false);
        });

        describe("in a child element of 'highlight: children'", () => {
          const schema = getSchemaHighlight({
            highlightType: "children",
            showHighlightChildren: true,
          });
          const levels = getLevels({
            schema,
            connectedLevels: [],
          });
          const leHi = getLevelsHightlights(levels);

          expect(leHi(1)).toStrictEqual(false);
          expect(leHi(2)).toStrictEqual(false);
        });

        describe("in a child element of 'highlight: all'", () => {
          const schema = getSchemaHighlight({
            showHighlightChildren: true,
          });
          const levels = getLevels({
            schema,
            connectedLevels: [],
          });
          const leHi = getLevelsHightlights(levels);

          expect(leHi(1)).toStrictEqual(true);
          expect(leHi(2)).toStrictEqual(false);
        });
      });
    });

    describe("with an object", () => {
      describe("with an object with a property 'type' empty", () => {
        const schema = [
          {
            isConnected: true,
            title: "pages",
            type: "",
          },
        ];

        it("should return a property 'type' with the 'folder' value", () => {
          const levels = getLevels({
            schema,
            connectedLevels: [],
          });

          expect(levels[0]).toStrictEqual({
            title: "pages",
            depth: 0,
            type: "folder",
            highlight: false,
            isDepthFirstChild: true,
            isDepthLastChild: true,
          });
        });
      });

      describe("with an object without a property 'type'", () => {
        const schema = [
          {
            isConnected: true,
            title: "pages",
          },
        ];

        it("should return a property 'type' with the 'folder' value", () => {
          const levels = getLevels({
            schema,
            connectedLevels: [],
          });

          expect(levels[0]).toStrictEqual({
            title: "pages",
            depth: 0,
            type: "folder",
            highlight: false,
            isDepthFirstChild: true,
            isDepthLastChild: true,
          });
        });
      });

      describe("with an object with a property 'type' title", () => {
        const schema = [
          {
            isConnected: true,
            title: "",
            type: "",
          },
        ];

        it("should return a property 'title' with an empty string as value", () => {
          const levels = getLevels({
            schema,
            connectedLevels: [],
          });

          expect(levels[0]).toStrictEqual({
            title: "",
            depth: 0,
            type: "folder",
            highlight: false,
            isDepthFirstChild: true,
            isDepthLastChild: true,
          });
        });
      });

      describe("with an object without a property 'title'", () => {
        const schema = [
          {
            isConnected: true,
          },
        ];

        it("should return a property 'title' with an empty string as value", () => {
          const levels = getLevels({
            schema,
            connectedLevels: [],
          });

          expect(levels[0]).toStrictEqual({
            title: "",
            depth: 0,
            type: "folder",
            highlight: false,
            isDepthFirstChild: true,
            isDepthLastChild: true,
          });
        });
      });
    });
  });

  describe("given an empty schema", () => {
    it("should return an empty array", () => {
      const levels = getLevels({
        schema: [],
      });

      expect(levels).toStrictEqual([]);
    });
  });
});

describe("regarding the treeParser function", () => {
  describe("given an schema", () => {
    describe("without highlighted lines", () => {
      describe("with multiple elements in the root", () => {
        it("should return an string tree view", () => {
          const schema = [
            { title: "folder 1" },
            { title: "folder 2" },
            {
              title: "folder 3",
              children: [
                { title: "file 1", type: "file" },
                { title: "file 2", type: "file" },
                { title: "file 3", type: "file" },
              ],
            },
          ];

          console.log(treeParser(schema));

          expect(treeParser(schema)).toStrictEqual(`📁 folder 1
📁 folder 2
📁 folder 3
├──📝 file 1
├──📝 file 2
└──📝 file 3`);
        });
      });

      describe("with multiple connected elements", () => {
        it("should return an string tree view", () => {
          const schema = [
            {
              title: "folder 1",
              isConnected: true,
              children: [
                { title: "file 1", type: "file" },
                {
                  title: "folder 2",
                  isConnected: true,
                  children: [
                    { title: "file 2", type: "file" },
                    { title: "file 3", type: "file" },
                  ],
                },
                {
                  title: "folder 3",
                },
              ],
            },
            {
              other: true,
            },
          ];

          console.log(treeParser(schema));

          expect(treeParser(schema)).toStrictEqual(`📁 folder 1
│├──📝 file 1
│├──📁 folder 2
││  ├──📝 file 2
││  └──📝 file 3
│└──📁 folder 3
└──✨ ... `);
        });
      });
    });

    describe("with highlighted lines", () => {
      it("should return an string tree view", () => {
        const schema = getSchemaHighlight();

        expect(treeParser(schema)).toStrictEqual(`📁 pages
// highlight-next-line
│└──📁 products
// highlight-next-line
│   ├──📝 header.js
// highlight-next-line
│   └──📝 index.js
└──✨ ... `);
      });
    });
  });
});
