import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync } from "node:fs";
import { characters } from "../src/data/characters.ts";
import { locations } from "../src/data/locations.ts";
import { connections } from "../src/data/lore.ts";
import { arcs } from "../src/data/arcs.ts";
import { volumes } from "../src/data/volumes.ts";
import { navigation } from "../src/data/navigation.ts";
import { devils } from "../src/data/devils.ts";
import { arcsForVolume } from "../src/lib/archive.ts";

test("character relationships, locations and lore resolve to existing records", () => {
  const ids = new Set(characters.map((character) => character.id));
  assert.equal(ids.size, characters.length);
  for (const id of [...characters.flatMap((c) => c.relationships), ...locations.flatMap((l) => l.characters), ...connections.flatMap((c) => [c.from, c.to])]) assert.ok(ids.has(id), id);
  for (const part of ["1", "2"] as const) assert.ok(characters.some((character) => character.parts.includes(part)));
  assert.ok(characters.every((character) => character.japanese.trim().length > 0), "Every character needs a Japanese name");
  assert.ok(characters.every((character) => !character.background.includes("is a playable character associated with")));
});

test("all navigation destinations have route files", () => {
  assert.equal(navigation.length, 7);
  for (const item of navigation) assert.ok(existsSync(`src/app${item.href === "/" ? "" : item.href}/page.tsx`), item.href);
});

test("artwork references exist and use raster extensions", () => {
  assert.ok(existsSync("public/images/placeholders/artwork.png"));
  for (const character of characters) {
    if (!character.artwork) continue;
    assert.match(character.artwork, /^\/images\/.+\.(png|jpe?g|webp|avif)$/i);
    assert.ok(existsSync(`public${character.artwork}`));
  }
});

test("classified records have explicit types and local artwork paths", () => {
  assert.equal(new Set(devils.map((file) => file.id)).size, devils.length);
  assert.equal(devils.find((file) => file.id === "TE-001")?.type, "entity");
  assert.equal(devils.find((file) => file.id === "TE-010")?.subcategory, "Geo Dragon Sovereign Remnant");
  assert.equal(devils.find((file) => file.id === "TE-016")?.subcategory, "Tsaritsa's Executive Council");
  for (const file of devils) {
    assert.ok(file.type === "devil" || file.type === "fiend" || file.type === "entity");
    if (!file.artwork) continue;
    assert.match(file.artwork, /^\/images\/devils\/.+\.(png|webp|avif|jpe?g)$/i);
    assert.ok(existsSync("public" + file.artwork));
  }
});

test("volume chapters and story arcs match the supplied covers", () => {
  assert.equal(volumes.length, 9);
  assert.equal(volumes[5].part, "2");
  assert.deepEqual(volumes.map((volume) => volume.number), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assert.ok(existsSync("public/images/placeholders/artwork.png"));
  for (const volume of volumes) {
    assert.match(volume.cover ?? "", /^\/images\/locations\/.+\.svg$/i);
    assert.ok(existsSync(`public${volume.cover}`));
  }
  assert.ok(arcs.every((arc) => arc.chapters && arc.description.length > 70 && !arc.description.includes("undefined")));
  assert.ok(arcs.every((arc) => /^https:\/\/genshin\.hoyoverse\.com\//.test(arc.sourceUrl)));
  assert.equal(arcs.length, 36);
  for (const arc of arcs) {
    assert.match(arc.artwork ?? "", /^\/images\/(locations|characters)\/.+\.(svg|png|jpe?g)$/i);
    assert.ok(existsSync(`public${arc.artwork}`), arc.name);
  }
});
