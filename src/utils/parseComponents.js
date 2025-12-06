/**
 * React component parser - builds a component tree from source files
 */

function getComponentType(filePath) {
  const fileName = filePath.split("/").pop();
  if (fileName.match(/^App\.(jsx?|tsx?|js|ts)$/)) return "root";

  const parts = filePath.split("/");
  const fileIndex = parts.length - 1;

  if (fileIndex > 0) {
    const parentFolder = parts[fileIndex - 1];
    if (["src", "components", "lib", "utils"].includes(parentFolder)) {
      return fileIndex > 1 ? parts[fileIndex - 2].toLowerCase() : "component";
    }
    return parentFolder.toLowerCase();
  }
  return "component";
}

function getCategoryPath(filePath) {
  const parts = filePath.split("/");
  const srcIndex = parts.indexOf("src");
  if (srcIndex >= 0 && srcIndex < parts.length - 2) {
    return parts.slice(srcIndex + 1, -1).join("/");
  }
  return "";
}

function extractComponentName(content, filePath) {
  const patterns = [
    /export\s+default\s+function\s+(\w+)/,
    /function\s+(\w+)\s*\(/,
    /(?:export\s+)?const\s+(\w+)\s*=\s*\([^)]*\)\s*=>/,
    /export\s+default\s+(\w+)\s*;?\s*$/m,
    /export\s+(?:const|function)\s+(\w+)/,
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) return match[1];
  }

  return filePath
    .split("/")
    .pop()
    .replace(/\.(jsx?|tsx?|js|ts)$/, "");
}

function extractImports(content) {
  const imports = [];

  // Default imports
  const defaultImports = content.matchAll(
    /import\s+(\w+)\s+from\s+["']([^"']+)["']/g
  );
  for (const [, name, path] of defaultImports) {
    if (
      (path.startsWith("./") || path.startsWith("../")) &&
      name !== "React" &&
      name !== "styled"
    ) {
      imports.push({ name, path });
    }
  }

  // Named imports
  const namedImports = content.matchAll(
    /import\s*\{([^}]+)\}\s*from\s*["']([^"']+)["']/g
  );
  for (const [, names, path] of namedImports) {
    if (path.startsWith("./") || path.startsWith("../")) {
      names
        .split(",")
        .map((n) => {
          const trimmed = n.trim();
          const asMatch = trimmed.match(/(\w+)\s+as\s+(\w+)/);
          return asMatch ? asMatch[2] : trimmed;
        })
        .filter(
          (name) =>
            name &&
            name !== "React" &&
            name !== "styled" &&
            !name.startsWith("use")
        )
        .forEach((name) => imports.push({ name, path }));
    }
  }

  return imports;
}

function findTagEnd(content, startPos) {
  let i = startPos;
  let braceDepth = 0;
  let inString = false;
  let stringChar = null;

  while (i < content.length) {
    const char = content[i];
    const prevChar = i > 0 ? content[i - 1] : "";

    if ((char === '"' || char === "'" || char === "`") && prevChar !== "\\") {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
        stringChar = null;
      }
    }

    if (!inString) {
      if (char === "{") braceDepth++;
      if (char === "}") braceDepth--;

      if (braceDepth === 0) {
        if (char === ">" && prevChar === "/")
          return { end: i + 1, selfClosing: true };
        if (char === ">") return { end: i + 1, selfClosing: false };
      }
    }
    i++;
  }
  return null;
}

function findClosingTag(content, tagName, startPos) {
  let depth = 1;
  let i = startPos;
  const openPattern = new RegExp(`<${tagName}(?:\\s|>|/>)`);
  const closePattern = `</${tagName}>`;

  while (i < content.length && depth > 0) {
    const remaining = content.substring(i);

    if (remaining.startsWith(closePattern)) {
      depth--;
      if (depth === 0) return i + closePattern.length;
      i += closePattern.length;
      continue;
    }

    const openMatch = remaining.match(openPattern);
    if (openMatch && openMatch.index === 0) {
      const tagEnd = findTagEnd(content, i + tagName.length + 1);
      if (tagEnd && !tagEnd.selfClosing) depth++;
      i += openMatch[0].length;
      continue;
    }
    i++;
  }
  return depth === 0 ? i : -1;
}

function extractPropValue(content, startIndex) {
  const firstChar = content[startIndex];

  if (firstChar === '"' || firstChar === "'") {
    const endIndex = content.indexOf(firstChar, startIndex + 1);
    if (endIndex > startIndex) {
      return {
        value: content.substring(startIndex + 1, endIndex),
        endIndex: endIndex + 1,
      };
    }
  }

  if (firstChar === "{") {
    let depth = 1;
    let i = startIndex + 1;
    while (i < content.length && depth > 0) {
      if (content[i] === "{") depth++;
      if (content[i] === "}") depth--;
      i++;
    }
    const expr = content.substring(startIndex + 1, i - 1).trim();
    const simplified = expr
      .replace(/^['"`](.*)['"`]$/, "$1")
      .replace(/^\(\)\s*=>\s*/, "() => ")
      .substring(0, 60);
    return { value: simplified + (expr.length > 60 ? "..." : ""), endIndex: i };
  }

  return { value: "", endIndex: startIndex };
}

function extractPropsFromTag(tagContent) {
  const props = {};
  const propNameRegex = /(\w+)\s*=/g;
  let match;

  while ((match = propNameRegex.exec(tagContent)) !== null) {
    const propName = match[1];
    if (propName !== "className" && propName !== "style") {
      const { value } = extractPropValue(
        tagContent,
        match.index + match[0].length
      );
      props[propName] = value || "true";
    }
  }
  return props;
}

function findAllComponentUsages(content, componentNames) {
  const usages = [];

  componentNames.forEach((name) => {
    const tagStartRegex = new RegExp(`<${name}(?=\\s|>|/>)`, "g");
    let match;

    while ((match = tagStartRegex.exec(content)) !== null) {
      const tagStart = match.index;
      const tagEnd = findTagEnd(content, tagStart + name.length + 1);
      if (!tagEnd) continue;

      const tagContent = content.substring(tagStart, tagEnd.end);
      const props = extractPropsFromTag(tagContent);

      if (tagEnd.selfClosing) {
        usages.push({
          name,
          start: tagStart,
          end: tagEnd.end,
          props,
          hasChildren: false,
        });
      } else {
        const closeEnd = findClosingTag(content, name, tagEnd.end);
        if (closeEnd > 0) {
          usages.push({
            name,
            start: tagStart,
            end: closeEnd,
            innerStart: tagEnd.end,
            innerEnd: closeEnd - `</${name}>`.length,
            props,
            hasChildren: true,
          });
        }
      }
    }
  });

  return usages.sort((a, b) => a.start - b.start);
}

function extractJSXStructure(content, importedComponents) {
  const componentNames = importedComponents.map((i) => i.name);
  const directChildren = {};
  const nestedChildren = {};

  let functionBody = null;
  const fnMatch = content.match(/function\s+\w+\s*\([^)]*\)\s*\{([\s\S]*)\}/);
  if (fnMatch) functionBody = fnMatch[1];

  if (!functionBody) {
    const arrowMatch = content.match(
      /=>\s*\{?([\s\S]*)\}?\s*;?\s*(?:export|const|$)/
    );
    if (arrowMatch) functionBody = arrowMatch[1];
  }

  if (!functionBody) {
    const returnMatch = content.match(/return\s*\(([\s\S]*?)\);/);
    if (returnMatch) functionBody = returnMatch[1];
  }

  if (!functionBody) return { directChildren, nestedChildren };

  const allUsages = findAllComponentUsages(functionBody, componentNames);

  allUsages.forEach((usage) => {
    let parentComp = null;

    for (const other of allUsages) {
      if (
        other === usage ||
        !other.hasChildren ||
        other.innerStart === undefined
      )
        continue;
      if (usage.start > other.innerStart && usage.end <= other.innerEnd) {
        if (
          !parentComp ||
          other.end - other.start < parentComp.end - parentComp.start
        ) {
          parentComp = other;
        }
      }
    }

    const target = parentComp
      ? (nestedChildren[parentComp.name] ??= {})
      : directChildren;

    const childKey = parentComp ? usage.name : usage.name;
    if (!target[childKey]) target[childKey] = { count: 0, instances: [] };
    target[childKey].count++;
    target[childKey].instances.push({
      id: target[childKey].count,
      props: usage.props,
    });
  });

  return { directChildren, nestedChildren };
}

function extractPropsDefinition(content, componentName) {
  const patterns = [
    new RegExp(`function\\s+${componentName}\\s*\\(\\s*\\{([^}]*)\\}\\s*\\)`),
    new RegExp(
      `(?:const|let)\\s+${componentName}\\s*=\\s*\\(\\s*\\{([^}]*)\\}\\s*\\)`
    ),
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return match[1]
        .split(",")
        .map((p) => p.trim().split("=")[0].trim())
        .filter(Boolean);
    }
  }
  return [];
}

export function parseComponentFiles(files) {
  const components = {};

  Object.entries(files).forEach(([filePath, content]) => {
    const componentName = extractComponentName(content, filePath);
    const imports = extractImports(content);
    const propsDefinition = extractPropsDefinition(content, componentName);
    const { directChildren, nestedChildren } = extractJSXStructure(
      content,
      imports
    );

    components[componentName] = {
      name: componentName,
      filePath: filePath.replace(/^\/testData/, "testData"),
      type: getComponentType(filePath),
      category: getCategoryPath(filePath),
      directChildren,
      nestedChildren,
      propsDefinition,
    };
  });

  const nodes = [];
  const edges = [];
  let nodeIdCounter = 0;
  const addedComponents = new Set();

  const getNodeId = () => `node-${++nodeIdCounter}`;

  const processComponent = (
    componentName,
    parentNodeId,
    usageInfo,
    parentNestedChildren = null
  ) => {
    const comp = components[componentName];
    if (!comp) return null;

    addedComponents.add(componentName);
    const nodeId = getNodeId();

    nodes.push({
      id: nodeId,
      type: "component",
      data: {
        label: componentName,
        componentType: comp.type,
        category: comp.category,
        filePath: comp.filePath,
        propsDefinition: comp.propsDefinition,
        usageCount: usageInfo ? usageInfo.count : 1,
        instances: usageInfo ? usageInfo.instances : null,
        isOrphan: false,
      },
    });

    if (parentNodeId) {
      edges.push({
        id: `${parentNodeId}-${nodeId}`,
        source: parentNodeId,
        target: nodeId,
        type: "smoothstep",
      });
    }

    Object.entries(comp.directChildren).forEach(([childName, usage]) => {
      if (components[childName]) {
        processComponent(childName, nodeId, usage, comp.nestedChildren);
      }
    });

    if (parentNestedChildren?.[componentName]) {
      Object.entries(parentNestedChildren[componentName]).forEach(
        ([nestedName, nestedUsage]) => {
          if (components[nestedName]) {
            processComponent(nestedName, nodeId, nestedUsage, null);
          }
        }
      );
    }

    return nodeId;
  };

  const appComponent = Object.keys(components).find(
    (name) => name === "App" || components[name].type === "root"
  );

  if (appComponent) processComponent(appComponent, null, null, null);

  // Orphan components
  const orphans = Object.keys(components).filter(
    (name) => !addedComponents.has(name)
  );

  if (orphans.length > 0) {
    const orphansContainerId = getNodeId();
    nodes.push({
      id: orphansContainerId,
      type: "component",
      data: {
        label: "⚠️ Orphan Components",
        componentType: "orphan",
        category: "unused",
        filePath: "",
        propsDefinition: [],
        usageCount: orphans.length,
        instances: null,
        isOrphan: true,
        isOrphanContainer: true,
      },
    });

    orphans.forEach((name) => {
      const comp = components[name];
      const orphanNodeId = getNodeId();

      nodes.push({
        id: orphanNodeId,
        type: "component",
        data: {
          label: name,
          componentType: "orphan",
          category: comp.category,
          filePath: comp.filePath,
          propsDefinition: comp.propsDefinition,
          usageCount: 0,
          instances: null,
          isOrphan: true,
        },
      });

      edges.push({
        id: `${orphansContainerId}-${orphanNodeId}`,
        source: orphansContainerId,
        target: orphanNodeId,
        type: "smoothstep",
        style: { strokeDasharray: "5,5" },
      });
    });
  }

  return { nodes, edges, orphanCount: orphans.length };
}

export async function loadTestData() {
  const modules = import.meta.glob("/testData/src/**/*.{jsx,tsx,js,ts}", {
    as: "raw",
  });
  const skipPaths = [
    "index.js",
    "reportWebVitals",
    "setupTests",
    "helpers/",
    "hooks/",
    "context/",
    "api/",
    "styles/",
    "constants/",
    "assets/",
  ];

  const files = {};
  for (const [path, loader] of Object.entries(modules)) {
    if (skipPaths.some((skip) => path.includes(skip))) continue;
    files[path] = await loader();
  }

  return parseComponentFiles(files);
}
