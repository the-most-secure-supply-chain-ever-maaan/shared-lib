# shared-lib

Intern npm-pakke publisert til GitHub Packages som `@the-most-secure-supply-chain-ever-maaan/shared-lib`.

## Oppsett for utviklere (én gang)


```bash
gh auth refresh -s read:packages
```

Legger til scopet `read:packages` på `gh`-tokenet ditt. Scopet gjelder brukeren din, ikke ett repo, så du får lesetilgang til alle pakker du allerede har tilgang til via repoene.

Legg så dette i shell-profilen din (`~/.zshrc` eller `~/.bashrc`):

```bash
export GITHUB_TOKEN=$(gh auth token)
```

`.npmrc` i prosjektet leser `GITHUB_TOKEN` og bruker den mot `npm.pkg.github.com`. Etter dette fungerer `npm ci` og `npm i` som normalt.


### Bruke pakken i et annet prosjekt

Legg til `.npmrc` i prosjektet:

```
@the-most-secure-supply-chain-ever-maaan:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Installer deretter pakken:

```bash
npm i @the-most-secure-supply-chain-ever-maaan/shared-lib
```
