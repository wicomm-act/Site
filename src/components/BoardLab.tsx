"use client";

import { useEffect, useState } from "react";
import { ArrowIcon } from "@/components/Icons";

type Board = "ESP32" | "STM32";

export function BoardLab() {
  const [board, setBoard] = useState<Board>("ESP32");
  const [on, setOn] = useState(false);
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    if (!blinking) return;
    const timer = window.setInterval(() => setOn((value) => !value), 800);
    return () => window.clearInterval(timer);
  }, [blinking]);

  function selectBoard(next: Board) {
    setBoard(next);
    setOn(false);
    setBlinking(false);
  }

  const lines = board === "ESP32"
    ? ["// An external LED on GPIO 2", "const int LED = 2;", "", "void setup() {", "  pinMode(LED, OUTPUT);", "}", "", "void loop() {", `  digitalWrite(LED, ${blinking ? "HIGH" : on ? "HIGH" : "LOW"});`, ...(blinking ? ["  delay(800);", "  digitalWrite(LED, LOW);", "  delay(800);"] : []), "}"]
    : ["// Configure PC13 as output first", "// External LED · STM32 HAL", "", "while (1) {", ...(blinking ? ["  HAL_GPIO_TogglePin(", "    GPIOC, GPIO_PIN_13);", "  HAL_Delay(800);"] : ["  HAL_GPIO_WritePin(", "    GPIOC, GPIO_PIN_13,", `    GPIO_PIN_${on ? "SET" : "RESET"});`]), "}"];

  return (
    <div className="lab-demo">
      <div className="lab-toolbar">
        <div className="board-switch" aria-label="Choose a code example">
          {(["ESP32", "STM32"] as const).map((item) => <button key={item} type="button" aria-pressed={board === item} onClick={() => selectBoard(item)}>{item}</button>)}
        </div>
        <span className="simulation-label"><span /> Browser simulation</span>
      </div>
      <div className="lab-content">
        <div className="code-pane">
          <div className="code-file"><span>{board === "ESP32" ? "blink.ino" : "main.c"}</span><span>{board === "ESP32" ? "C++ / Arduino" : "C / STM32 HAL"}</span></div>
          <pre aria-label={`${board} LED example`}><code>{lines.map((line, index) => <span key={index} className={line.startsWith("//") ? "code-comment" : line.includes("digitalWrite") || line.includes("GPIO_PIN_") ? "code-highlight" : ""}><span className="line-number" aria-hidden="true">{index + 1}</span>{line || " "}{"\n"}</span>)}</code></pre>
        </div>
        <div className="output-pane">
          <div className="output-label"><span>Output preview</span><span className="pin-label">{board === "ESP32" ? "GPIO 2" : "PC13"}</span></div>
          <div className={`led-preview ${on ? "is-on" : ""}`} aria-hidden="true"><div className="led-bulb" /><div className="led-legs"><span /><span /></div><div className="led-base" /></div>
          <div className="led-state" aria-live={blinking ? "off" : "polite"}><span className={on ? "state-dot is-on" : "state-dot"} />{blinking ? "Blinking · 800 ms" : on ? "LED is on" : "LED is off"}</div>
          <div className="lab-actions">
            <button type="button" className="button button-lime" disabled={blinking} onClick={() => setOn(!on)}>{on ? "Turn LED off" : "Turn LED on"}<ArrowIcon /></button>
            <button type="button" className="blink-button" aria-pressed={blinking} onClick={() => { setBlinking(!blinking); setOn(false); }}>{blinking ? "Stop blinking" : "Run blink"}</button>
          </div>
        </div>
      </div>
      <p className="lab-note">An illustrative code example, not connected hardware. External LED and current-limiting resistor required for a physical build.</p>
    </div>
  );
}
