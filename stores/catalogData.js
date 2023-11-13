import { defineStore } from "pinia";
import { reactive, computed } from "vue";

export const useCatalogData = defineStore("catalogData", () => {
  const catalogData = {
    single: [
      {
        src: "1.png",
        alt: "Одиночні",
        title: "Одиночні",
        description: "some text",
      },
      {
        src: "1.png",
        alt: "Одиночні",
        title: "Одиночні",
        description: "some text",
      },
      {
        src: "1.png",
        alt: "Одиночні",
        title: "Одиночні",
        description: "some text",
      },
      {
        src: "1.png",
        alt: "Одиночні",
        title: "Одиночні",
        description: "some text",
      },
      {
        src: "1.png",
        alt: "Одиночні",
        title: "Одиночні",
        description: "some text",
      },
      {
        src: "1.png",
        alt: "Одиночні",
        title: "Одиночні",
        description: "some text",
      },
      {
        src: "1.png",
        alt: "Одиночні",
        title: "Одиночні",
        description: "some text",
      },
      {
        src: "1.png",
        alt: "Одиночні",
        title: "Одиночні",
        description: "some text",
      },
      {
        src: "1.png",
        alt: "Одиночні",
        title: "Одиночні",
        description: "some text",
      },
      {
        src: "1.png",
        alt: "Одиночні",
        title: "Одиночні",
        description: "some text",
      },
    ],
    double: [
      {
        src: "2.png",
        alt: "Двійні",
        title: "Двійні",
        description: "some text",
      },
      {
        src: "2.png",
        alt: "Двійні",
        title: "Двійні",
        description: "some text",
      },
      {
        src: "2.png",
        alt: "Двійні",
        title: "Двійні",
        description: "some text",
      },
      {
        src: "2.png",
        alt: "Двійні",
        title: "Двійні",
        description: "some text",
      },
      {
        src: "2.png",
        alt: "Двійні",
        title: "Двійні",
        description: "some text",
      },
      {
        src: "2.png",
        alt: "Двійні",
        title: "Двійні",
        description: "some text",
      },
      {
        src: "2.png",
        alt: "Двійні",
        title: "Двійні",
        description: "some text",
      },
      {
        src: "2.png",
        alt: "Двійні",
        title: "Двійні",
        description: "some text",
      },
      {
        src: "2.png",
        alt: "Двійні",
        title: "Двійні",
        description: "some text",
      },
      {
        src: "2.png",
        alt: "Двійні",
        title: "Двійні",
        description: "some text",
      },
    ],
    marble: [
      {
        src: "mram.png",
        alt: "Меморіальні Комплекси",
        title: "Меморіальні Комплекси",
        description: "some text",
      },
      {
        src: "mram.png",
        alt: "Меморіальні Комплекси",
        title: "Меморіальні Комплекси",
        description: "some text",
      },
      {
        src: "mram.png",
        alt: "Меморіальні Комплекси",
        title: "Меморіальні Комплекси",
        description: "some text",
      },
      {
        src: "mram.png",
        alt: "Меморіальні Комплекси",
        title: "Меморіальні Комплекси",
        description: "some text",
      },
      {
        src: "mram.png",
        alt: "Меморіальні Комплекси",
        title: "Меморіальні Комплекси",
        description: "some text",
      },
      {
        src: "mram.png",
        alt: "Меморіальні Комплекси",
        title: "Меморіальні Комплекси",
        description: "some text",
      },
      {
        src: "mram.png",
        alt: "Меморіальні Комплекси",
        title: "Меморіальні Комплекси",
        description: "some text",
      },
      {
        src: "mram.png",
        alt: "Меморіальні Комплекси",
        title: "Меморіальні Комплекси",
        description: "some text",
      },
      {
        src: "mram.png",
        alt: "Меморіальні Комплекси",
        title: "Меморіальні Комплекси",
        description: "some text",
      },
      {
        src: "mram.png",
        alt: "Меморіальні Комплекси",
        title: "Меморіальні Комплекси",
        description: "some text",
      },
    ],
    concrete: [
      {
        src: "bet.png",
        alt: "Бетоні",
        title: "Бетоні",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Бетоні",
        title: "Бетоні",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Бетоні",
        title: "Бетоні",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Бетоні",
        title: "Бетоні",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Бетоні",
        title: "Бетоні",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Бетоні",
        title: "Бетоні",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Бетоні",
        title: "Бетоні",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Бетоні",
        title: "Бетоні",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Бетоні",
        title: "Бетоні",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Бетоні",
        title: "Бетоні",
        description: "some text",
      },
    ],
    kids: [
      {
        src: "bet.png",
        alt: "Дитячі",
        title: "Дитячі",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Дитячі",
        title: "Дитячі",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Дитячі",
        title: "Дитячі",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Дитячі",
        title: "Дитячі",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Дитячі",
        title: "Дитячі",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Дитячі",
        title: "Дитячі",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Дитячі",
        title: "Дитячі",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Дитячі",
        title: "Дитячі",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Дитячі",
        title: "Дитячі",
        description: "some text",
      },
      {
        src: "bet.png",
        alt: "Дитячі",
        title: "Дитячі",
        description: "some text",
      },
    ],
    accessories: [
      {
        src: "acs.png",
        alt: "Аксесуари",
        title: "Аксесуари",
        description: "some text",
      },
      {
        src: "acs.png",
        alt: "Аксесуари",
        title: "Аксесуари",
        description: "some text",
      },
      {
        src: "acs.png",
        alt: "Аксесуари",
        title: "Аксесуари",
        description: "some text",
      },
      {
        src: "acs.png",
        alt: "Аксесуари",
        title: "Аксесуари",
        description: "some text",
      },
      {
        src: "acs.png",
        alt: "Аксесуари",
        title: "Аксесуари",
        description: "some text",
      },
      {
        src: "acs.png",
        alt: "Аксесуари",
        title: "Аксесуари",
        description: "some text",
      },
      {
        src: "acs.png",
        alt: "Аксесуари",
        title: "Аксесуари",
        description: "some text",
      },
      {
        src: "acs.png",
        alt: "Аксесуари",
        title: "Аксесуари",
        description: "some text",
      },
      {
        src: "acs.png",
        alt: "Аксесуари",
        title: "Аксесуари",
        description: "some text",
      },
      {
        src: "acs.png",
        alt: "Аксесуари",
        title: "Аксесуари",
        description: "some text",
      },
    ],
  };

  const activeTab = reactive(["single"]);

  const changeTab = (tab) => {
    return (activeTab[0] = tab);
  };

  const filterCatalogData = () => {
    return catalogData[activeTab[0]];
  };

  return {
    activeTab,
    changeTab,
    catalogData,
    filterCatalogData,
  };
});
