# Chile Division
Geographic and Administrative division of Chile, as JSON.

## Data
All data is available in `dist` directory.

## Version
* Current Version: valid for 2017 elections.

# Models

* **Geographic**:
  * Region (*Región*)
  * Province (*Provincia*)
  * Commune (*Comuna*)
* **Administrative**:
  * Senatorial Circumscription (*Circunscripción Senatoral*)
  * District (*Distrito*)
  * Provincial Circumscription (*Circunscripción Provincial*)

Models are referenced by their identifier and not nested. Check [Transforms](#transforms) for nested versions.

## Relationships
Geographic models follow a nested relationship:
* Region is composed by Provinces
* Province is composed by Communes

Administrative models are related to Geographic models:
* **Senatorial Circumscription — Region**: 1-to-1
* **District — Commune**: 1-to-N, one District is a group of communes of the same Region, one Commune belongs to only one District.
* **Provincial Circumscription — Province**: N-to-1, one Provincial Circumscription belongs to only one Province, one Province has one or more Provincial Circumscription


## Properties
All properties are strings, check [Transforms](#transforms) for versions with numbers.

### Geographic
#### Region
| Property | Type | Description |
|:-|:-:|:-|
| `code` (identifier) | String(Number) | *Código Único Territorial* of Region |
|`name` | Object | Object with two properties: `full` and `short` |
| `name.full` | String | Full name of Region |
| `name.short` | String | Short name of Region |
| `geoOrder` | String(Number) | Geographic order starting from `1` (northern region) |

#### Province
| Property | Type | Description |
|:-|:-:|:-|
| `code` (identifier) | String(Number) | *Código Único Territorial* of Province |
|`name` | String | Name of Province |
| `region` | String(Number) | Region which the Province belongs |

#### Commune

| Property | Type | Description |
|:-|:-:|:-|
| `code` (identifier) | String(Number) | *Código Único Territorial* of Commune |
|`name` | String | Name of Commune |
| `province` | String(Number) | Province which the Commune belongs |

### Administrative

#### Senatorial Circumscription

| Property | Type | Description |
|:-|:-:|:-|
| `code` (identifier) | String(Number) | Ordinal number of Circumscription |
|`name` | Object | Name of Circumscription |
| `apportionment` | String(Number) | Quantity of seats apportioned for Senators (*Senadores*) |
| `region` | String(Number) | Region related to Circumscription |

#### District

| Property | Type | Description |
|:-|:-:|:-|
| `code` (identifier) | String(Number) | Ordinal number of District |
|`communes` | Array(String(Number)) | Array of Communes that belong to District |
| `apportionment` | String(Number) | Quantity of seats apportioned for Deputies (*Diputados*) |
| `region` | String(Number) | Region which District's communes belong to |

#### Provincial Circumscription

| Property | Type | Description |
|:-|:-:|:-|
| `name` (identifier) | String | Name of Provincial Circumscription |
|`communes` | Array(String(Number)) | Array of Communes that belong to Provincial Circumscription |
| `apportionment` | String(Number) | Quantity of seats apportioned for Regional Counselors (*Consejeros Regionales*) |
| `province` | String(Number) | Province which Provincial Circumscription belongs to |

# Transforms

Transforms are JavaScript modules that manipulate original JSON files and generate a different representation of them. e.g: Merge geographic models into a single object or use numbers instead of strings as values type.

## Reading source files
Transforms should import `src` module, which exports an object with this shape (default):

```js
{
  communes: [/* … */],
  districts: [/* … */],
  provinces: [/* … */],
  provincialCircumscription: [/* … */],
  regions: [/* … */],
  senatorialCircumscription: [/* … */]
}
```

## API
### `transform()`
Applies transformation. Return value is an object with at least one of these keys: `communes`, `districts`, `provinces`, `provincialCircumscriptions`, `regions`, `senatorialCircumscriptions`. Values of these keys must be arrays.

## Identity transform

Identity transform returns the same files as source.
```js
import source from '../../src';

const transform = () => source;

export default {
  transform,
};
```

## Available Transforms
| Transform | Description | Exports | Author |
|-|-|-|-|
| `Identity` | Does nothing to source files | Object with default shape | |
|`ValuesAsNumbers`| Changes all String(Number) types to Number | Object with default shape | @wachunei|
