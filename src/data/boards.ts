export type DevelopmentBoard = {
  id: string;
  name: string;
  model: string;
  description: string;
  specs: string[];
  image: string;
  alt: string;
  source: string;
};

export const boards: DevelopmentBoard[] = [
  {
    id: "nxp-frdm-mcxn947",
    name: "NXP FRDM-MCXN947",
    model: "FRDM-MCXN947",
    description:
      "A compact development platform for exploring edge processing, embedded control, and connected applications.",
    specs: ["Dual-core Arm Cortex-M33", "Integrated neural processing unit", "Arduino-compatible headers"],
    image: "/images/boards/nxp-frdm-mcxn947.webp",
    alt: "NXP FRDM-MCXN947 development board",
    source: "https://www.nxp.com/design/design-center/development-boards-and-designs/FRDM-MCXN947",
  },
  {
    id: "stm32-nucleo-l476rg",
    name: "STM32 Nucleo L-series",
    model: "NUCLEO-L476RG",
    description:
      "A flexible STM32 prototyping board with an integrated debugger and broad expansion support.",
    specs: ["Arm Cortex-M4 core", "Integrated ST-LINK debugger", "Arduino and ST morpho headers"],
    image: "/images/boards/stm32-nucleo-l476rg.webp",
    alt: "STM32 Nucleo L476RG development board",
    source: "https://www.st.com/en/evaluation-tools/nucleo-l476rg.html",
  },
  {
    id: "stm32-blue-pill-f103c8t6",
    name: "STM32 Blue Pill",
    model: "STM32F103C8T6",
    description:
      "A small, widely used STM32 board suited to learning low-level firmware and peripheral control.",
    specs: ["Arm Cortex-M3 core", "USB and serial interfaces", "Breadboard-friendly form factor"],
    image: "/images/boards/stm32-blue-pill-f103c8t6.webp",
    alt: "STM32F103C8T6 Blue Pill development board",
    source: "https://stm32-base.org/boards/STM32F103C8T6-Blue-Pill.html",
  },
  {
    id: "silabs-bgm220p-explorer",
    name: "BGM220P Explorer Kit",
    model: "BGM220-EK4314A",
    description:
      "A Bluetooth development kit for prototyping compact, low-power connected products.",
    specs: ["Bluetooth Low Energy", "On-board sensors", "mikroBUS expansion socket"],
    image: "/images/boards/silabs-bgm220p-explorer.webp",
    alt: "Silicon Labs BGM220P Explorer Kit",
    source: "https://www.silabs.com/development-tools/wireless/bluetooth/bgm220-explorer-kit",
  },
  {
    id: "silabs-efr32bg22-explorer",
    name: "EFR32BG22 Explorer Kit",
    model: "BG22-EK4108A",
    description:
      "An energy-conscious wireless development kit for Bluetooth sensing and connected-device experiments.",
    specs: ["Bluetooth Low Energy", "Energy profiling support", "On-board sensors and expansion"],
    image: "/images/boards/silabs-efr32bg22-explorer.webp",
    alt: "Silicon Labs EFR32BG22 Explorer Kit",
    source: "https://www.silabs.com/development-tools/wireless/bluetooth/efr32bg22-explorer-kit",
  },
  {
    id: "silabs-efr32fg25-pro-kit",
    name: "EFR32FG25 Pro Kit",
    model: "FG25-PK6011A",
    description:
      "A professional development platform for evaluating long-range sub-GHz wireless applications.",
    specs: ["Sub-GHz wireless development", "Integrated debugger", "Packet trace and energy profiling"],
    image: "/images/boards/silabs-efr32fg25-pro-kit.webp",
    alt: "Silicon Labs EFR32FG25 Pro Kit",
    source: "https://www.silabs.com/development-tools/wireless/proprietary/efr32fg25-pro-kit",
  },
];
