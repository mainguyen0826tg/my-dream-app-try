import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import {  
  projectId, 
  totalSalesIdentifier, 
  locationNameAttributeUri, 
  productName,
  dateDataSetUri } from "../../../src/fixtures";

import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { Table, Model } from '@gooddata/react-components';

interface ChartProps {
  measures: any[];
  projectId: any;
  attributes: any[];
  sortBy?: any[];
  totals: any[];
  filters?: any[];
}

@Component({
  selector: 'app-table',
  template: '<div style="height: 300px" [id]="rootDomID"></div>'
})

export class TableComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  measures = [
    Model.measure(totalSalesIdentifier).localIdentifier("AverageAmount").format("#,##0")
  ];
  attributes = [
    Model.attribute(locationNameAttributeUri).localIdentifier("ProductName")
  ];
  sortBy = [
    Model.measureSortItem("AverageAmount","desc")
  ];
  totals = [{
    measureIdentifier: "AverageAmount",
    attributeIdentifier: "ProductName",
    type: "avg"
    
  },
  {
    measureIdentifier: "AverageWon",
    attributeIdentifier: "ProductName",
    type: "avg"
    
  }]
  filters = [
    {
      relativeDateFilter: {
        dataSet: {
            identifier: dateDataSetUri
        },
        granularity: 'GDC.time.year',
        from: -3, 
        to: -2  
      }
    }
];
 
  private rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): ChartProps {
    return {
      projectId: projectId,
      measures: this.measures,
      attributes: this.attributes,
      filters: this.filters,
      // sortBy: this.sortBy,
      totals: this.totals,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(Table, this.getProps()), this.getRootDomNode());
    }

  }

  ngOnInit() {
    this.rootDomID = uuid.v1();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }
}
