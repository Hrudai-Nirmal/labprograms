/**
 * Guards the website's button-to-source mapping so copied programs never drift
 * from the provided C lab submissions.
 */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

/**
 * Reads the serialized program mapping embedded in the static website.
 *
 * @returns {Promise<Record<string, string>>} The program source keyed by button number.
 */
async function getWebsitePrograms() {
  const pageSource = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const mappingMatch = pageSource.match(/^    const programs = (\{.*\});$/m);

  assert.ok(mappingMatch, 'index.html must expose a programs mapping');
  return JSON.parse(mappingMatch[1]);
}

test('maps each of the nine buttons to its matching C lab source', async () => {
  const websitePrograms = await getWebsitePrograms();

  assert.deepEqual(Object.keys(websitePrograms), Array.from({ length: 9 }, (_, index) => String(index + 1)));

  for (let programNumber = 1; programNumber <= 9; programNumber += 1) {
    const programSource = await readFile(
      new URL(`../../p${programNumber}.c`, import.meta.url),
      'utf8',
    );

    assert.equal(websitePrograms[String(programNumber)], programSource);
  }
});

test('renders exactly nine program buttons', async () => {
  const pageSource = await readFile(new URL('../index.html', import.meta.url), 'utf8');

  assert.match(pageSource, /for \(let i = 1; i <= 9; i \+= 1\)/);
});
