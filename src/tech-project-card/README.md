## &lt;rhi-ui-tech-project-card&gt;

### Install
`npm install --save @rhi-ui/tech-project-card`

### Basic usage

```html
<rhi-ui-tech-project-card
    champion="Patricia Mills"
    class="cliniquick"
    code="rhi-cq"
    description="Mobile data collection platform for the spasticity clinic at GF Strong."
    elevation="1"
    lead="Glenys"
    lead-initials="GM"
    name="CliniQuick for Spasticity"
    resources='[{"name": "Production site", "url": "https://www.isncscialgorithm.com/"},{"name": "Source code repository", "url": "https://rhitech.visualstudio.com/ISNCSCI%20Algorithm%20site"}]'
    status="maintenance">
</rhi-ui-tech-project-card>
```

### Style customization
| CSS variables                                        | Default                                    |
|:-----------------------------------------------------|:-------------------------------------------|
|--rhi-ui-tech-font-common-base-font-family            | 'Roboto', 'Noto', 'Open Sans', sans-serif' |
|--rhi-ui-tech-project-card-lead-icon-background-color | #000                                       |
|--rhi-ui-tech-project-card-lead-icon-color            | #FFF                                       |
|--rhi-ui-tech-project-card-media-background-color     | #CCC                                       |
|--rhi-ui-tech-project-card-media-background-image     | none                                       |

### Property(Attribute)
| Property(Attribute) | Type   | Description                                                              |
|---------------------|:-------|:-------------------------------------------------------------------------|
| champion            | string | Name of the project champion.                                            |
| code                | string | Project code usually used as the prefix for repositories and classes.    |
| description         | string | Project description.                                                     |
| elevation           | number | Value between 1 and 5 to determine the drop shadow of the component.     |
| lead                | string | Name of the IT member leading the project.                               |
| lead-initials       | string | Initials of the project lead.                                            |
| name                | string | The project's name.                                                      |
| resources           | string | List of web resources which provide extra information about the project. |
| status              | string | Current project status   |
