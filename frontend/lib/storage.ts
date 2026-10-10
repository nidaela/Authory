import { demoEvents, demoWork } from "@/lib/mock-data";
import type { RightsEvent } from "@/types/rights-event";
import type { Work } from "@/types/work";

export const storageKeys = {
  work: "authory_work",
  events: "authory_events",
  rights: "authory_rights",
} as const;

function getLocalStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readStoredValue<T>(key: string): T | null {
  const localStorage = getLocalStorage();

  if (!localStorage) {
    return null;
  }

  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

function writeStoredValue<T>(key: string, value: T): void {
  const localStorage = getLocalStorage();

  if (!localStorage) {
    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private browsing or when its quota is full.
  }
}

export function getWork(): Work {
  return readStoredValue<Work>(storageKeys.work) ?? { ...demoWork };
}

export function saveWork(work: Work): void {
  writeStoredValue(storageKeys.work, work);
}

export function getEvents(): RightsEvent[] {
  const storedEvents = readStoredValue<RightsEvent[]>(storageKeys.events);
  return storedEvents ?? demoEvents.map((event) => ({ ...event }));
}

export function saveEvents(events: RightsEvent[]): void {
  writeStoredValue(storageKeys.events, events);
}

export function addEvent(event: RightsEvent): RightsEvent[] {
  const events = [...getEvents(), event];
  saveEvents(events);
  return events;
}

export function resetDemo(): void {
  const localStorage = getLocalStorage();

  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(storageKeys.work);
    localStorage.removeItem(storageKeys.events);
    localStorage.removeItem(storageKeys.rights);
  } catch {
    // Keep the in-memory demo fallback available if browser storage is unavailable.
  }
}
