//this is a js script to run in zapier to transform the cost group data
//this is not the best way to do this, but zapier's environment is very limited 
//
//you'll need to know a few things:
//1. the cost group id
//2. the cost group name
//3. the cost group cost items (ids)
//4. the cost group cost item ids
//5. the cost group cost item names
//6. the cost type id
//7. the cost code id   
//
//
//all of that is found from another api script that runs before this one
//to find the cost group id 

// Using the input data as variables
const costGroupCostItems = inputData.costitemid || '';
const costItemCostGroupId = inputData.costgroupid || '';
const costItemNames = inputData.costitemname || '';
const costTypeId = inputData.costtypeid || '';
const costCodeId = inputData.costcodeid || '';
const costGroupId = inputData.costgroupid || '';
const costGroupName = inputData.costgroupname || '';

function buildUpdateJobQuery(jobId, costGroupId, costGroupName, costGroupCostItems, costItemCostGroupId, costItemNames, costTypeId, costCodeId) {
  const costItems = costGroupCostItems.split(',');
  const costItemGroups = costItemCostGroupId.split(',');
  const itemNames = costItemNames.split(',');
  const costTypes = costTypeId.split(',');
  const costCodes = costCodeId.split(',');

  const subGroups = {};

  costItems.forEach((itemId, index) => {
    const groupId = costItemGroups[index];
    if (!subGroups[groupId]) {
      subGroups[groupId] = {
        _type: "costGroup",
        description: null,
        //whoops i think this is hardcoded groupId, but needs to be dynamic
        name: groupId === "22Nr9UnNjWwi" ? "Material" : "Labor", 
        quantity: 0,
        quantityFormula: null,
        showChildCosts: true,
        showChildDeltas: false,
        showChildren: true,
        showDescription: true,
        unitId: null,
        lineItems: []
      };
    }

    subGroups[groupId].lineItems.push({
      _type: "costItem",
      costCodeId: costCodes[index],
      costTypeId: costTypes[index],
      customFieldValues: {},
      description: null,
      name: itemNames[index]
    });
  });

  return {
    updateJob: {
      _type: {},
      $: {
        id: jobId,
        lineItems: [
          {
            _type: "costGroup",
            description: null,
            files: [],
            name: costGroupName,
            lineItems: Object.values(subGroups)
          }
        ]
      },
      job: {
        _type: {},
        $: {
          id: jobId
        },
        id: {},
        lineItemsUpdatedAt: {}
      }
    }
  };
}

// Usage
const jobId = inputData.jobId || '';

const result = buildUpdateJobQuery(jobId, costGroupId, costGroupName, costGroupCostItems, costItemCostGroupId, costItemNames, costTypeId, costCodeId);
//console.log(JSON.stringify(result, null, 2));
const resultString = JSON.stringify(result, null, 2);
// For Zapier, you might want to set the output variable
output = {resultString};