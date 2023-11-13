import { defineStore } from "pinia";
import { reactive } from "vue";

export const useOurWorkData = defineStore("ourWorkData", () => {
  const ourWorkData = {
    single: [
      {
        src: "1.png",
        alt: "Одиночні",
      },
      {
        src: "4.png",
        alt: "Одиночні",
      },
      {
        src: "6.png",
        alt: "Одиночні",
      },
      {
        src: "4.png",
        alt: "Одиночні",
      },
      {
        src: "5.png",
        alt: "Одиночні",
      },
      {
        src: "6.png",
        alt: "Одиночні",
      },
      {
        src: "7.png",
        alt: "Одиночні",
      },
      {
        src: "8.png",
        alt: "Одиночні",
      },
      {
        src: "1.png",
        alt: "Одиночні",
      },
      {
        src: "1.png",
        alt: "Одиночні",
      },
    ],

    double: [
      {
        src: "2.png",
        alt: "Двійні",
      },
      {
        src: "1.png",
        alt: "Двійні",
      },
      {
        src: "2.png",
        alt: "Двійні",
      },
      {
        src: "3.png",
        alt: "Двійні",
      },
      {
        src: "4.png",
        alt: "Двійні",
      },
      {
        src: "5.png",
        alt: "Двійні",
      },
      {
        src: "6.png",
        alt: "Двійні",
      },
      {
        src: "7.png",
        alt: "Двійні",
      },
      {
        src: "8.png",
        alt: "Двійні",
      },
      {
        src: "9.png",
        alt: "Двійні",
      },
    ],

    marble: [
      {
        src: "3.png",
        alt: "Меморіальні Комплекси",
      },
      {
        src: "4.png",
        alt: "Меморіальні Комплекси",
      },
      {
        src: "3.png",
        alt: "Меморіальні Комплекси",
      },
      {
        src: "4.png",
        alt: "Меморіальні Комплекси",
      },
      {
        src: "5.png",
        alt: "Меморіальні Комплекси",
      },
      {
        src: "6.png",
        alt: "Меморіальні Комплекси",
      },
      {
        src: "7.png",
        alt: "Меморіальні Комплекси",
      },
      {
        src: "8.png",
        alt: "Меморіальні Комплекси",
      },
      {
        src: "9.png",
        alt: "Меморіальні Комплекси",
      },
      {
        src: "1.png",
        alt: "Меморіальні Комплекси",
      },
    ],

    concrete: [
      {
        src: "4.png",
        alt: "Бетоні",
      },
      {
        src: "8.png",
        alt: "Бетоні",
      },
      {
        src: "3.png",
        alt: "Бетоні",
      },
      {
        src: "4.png",
        alt: "Бетоні",
      },
      {
        src: "5.png",
        alt: "Бетоні",
      },
      {
        src: "6.png",
        alt: "Бетоні",
      },
      {
        src: "7.png",
        alt: "Бетоні",
      },
      {
        src: "8.png",
        alt: "Бетоні",
      },
      {
        src: "9.png",
        alt: "Бетоні",
      },
      {
        src: "1.png",
        alt: "Бетоні",
      },
    ],

    kids: [
      {
        src: "5.png",
        alt: "Дитячі",
      },
      {
        src: "9.png",
        alt: "Дитячі",
      },
      {
        src: "3.png",
        alt: "Дитячі",
      },
      {
        src: "4.png",
        alt: "Дитячі",
      },
      {
        src: "5.png",
        alt: "Дитячі",
      },
      {
        src: "6.png",
        alt: "Дитячі",
      },
      {
        src: "7.png",
        alt: "Дитячі",
      },
      {
        src: "8.png",
        alt: "Дитячі",
      },
      {
        src: "9.png",
        alt: "Дитячі",
      },
      {
        src: "1.png",
        alt: "Дитячі",
      },
    ],

    accessories: [
      {
        src: "6.png",
        alt: "Аксесуари",
      },
      {
        src: "8.png",
        alt: "Аксесуари",
      },
      {
        src: "3.png",
        alt: "Аксесуари",
      },
      {
        src: "4.png",
        alt: "Аксесуари",
      },
      {
        src: "5.png",
        alt: "Аксесуари",
      },
      {
        src: "6.png",
        alt: "Аксесуари",
      },
      {
        src: "7.png",
        alt: "Аксесуари",
      },
      {
        src: "8.png",
        alt: "Аксесуари",
      },
      {
        src: "9.png",
        alt: "Аксесуари",
      },
      {
        src: "1.png",
        alt: "Аксесуари",
      },
    ],
  };

  const activeTab = reactive(["single"]);

  const changeTab = (tab) => {
    return (activeTab[0] = tab);
  };

  return {
    activeTab,
    changeTab,
    ourWorkData,
  };
});
