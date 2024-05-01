export async function getWidgetNameById(widgetId: string): Promise<string> {
  try {
    // Read the map.json file to get the widget name from it's id
    const map = (await import("@/widgets/map.json")).default;
    return map[widgetId as keyof typeof map];
  } catch (e) {
    // @ts-ignore
    if (__VERBOSE__) {
      console.error(e);
    } else {
      console.error(
        "error: failed to import widget map at 'src/widgets/map.json'; please run 'thes map' to generate it"
      );
    }
    return "<undefined>";
  }
}

const structure = {
  pages: {
    published: {
      "3KifkONs1WnHGjNq6OxVa5CzgVXG21sG": {
        title: "Home",
        tags: ["home", "main", "example"],
        description: "This is the home page",
        path: "/",
        template: "$home",
        widgets: {
          wN0dXBrFAILbAPjpvAlZlDmEhy3dIywe: {
            title: "Example Widget",
            description: "This is just an example widget",
            imageUrl: "https://example.com/image.jpg",
            imageAlt: "Example Image",
            items: [
              {
                useAnImage: false,
                itemNumber: 1,
                itemTitle: "Example Item",
                itemDescription: "This is just an example item",
              },
              {
                useAnImage: false,
                itemNumber: 2,
                itemTitle: "Example Item 2",
                itemDescription: "This is just an example item 2",
              },
              {
                useAnImage: true,
                itemImageUrl: "https://example.com/image2.jpg",
                itemImageAlt: "Example Image 2",
                itemNumber: 2,
                itemTitle: "Example Item 2",
                itemDescription: "This is just an example item 2",
              },
            ],
          },
        },
      },
    },
    draft: {
      "3KifkONs1WnHGjNq6OxVa5CzgVXG21sG": {
        title: "Home",
        tags: ["home", "main", "example"],
        description: "This is the home page",
        path: "/",
        template: "$home",
        widgets: {
          wN0dXBrFAILbAPjpvAlZlDmEhy3dIywe: {
            title: "Example Widget 2",
            description: "This is just an example widget",
            imageUrl: "https://example.com/image.jpg",
            imageAlt: "Example Image",
            items: [
              {
                useAnImage: false,
                itemNumber: 1,
                itemTitle: "Example Item",
                itemDescription: "This is just an example item",
              },
              {
                useAnImage: false,
                itemNumber: 2,
                itemTitle: "Example Item 2",
                itemDescription: "This is just an example item 2",
              },
              {
                useAnImage: true,
                itemImageUrl: "https://example.com/image2.jpg",
                itemImageAlt: "Example Image 2",
                itemNumber: 2,
                itemTitle: "Example Item 2",
                itemDescription: "This is just an example item 2",
              },
            ],
          },
        },
      },
    },
  },
  templates: {
    home: "home",
  },
  users: {
    admins: {
      "7sYddSRRWrRlxrukMTu0znS94DH3BSOL": {
        lastLogin: 1630000000,
        loginAttempts: 0,
      },
      e21Y9GTJ2PHlidqillQoJb9E3tm59k1j: {
        lastLogin: 1630000000,
        loginAttempts: 0,
      },
    },
    editors: {
      Sl4hEILzJCfrzI5darzLTuNbzLsDSEPR: {
        lastLogin: 1630000000,
        loginAttempts: 0,
      },
    },
  },
};
