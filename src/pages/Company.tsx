import React, { useEffect, useState } from "react";
import backgroundImage from "assets/image/spacex-bg.jpg";
import { ScrollToTop } from "components/util";
import { DocumentNode, gql, useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import FieldSelectionBar from "components/FieldSelectionBar";
import DynamicCard from "components/DynamicCard";

const fields = [
    "coo",
    "cto",
    "cto_propulsion",
    "employees",
    "founded",
    "founder",
    "vehicles",
    "valuation",
    "test_sites",
    "summary",
    "name"
  ];

const defaultSelection = ["ceo", "coo"]; // Default selected values

const getCompanyQuery = (selectedFields: string[]): DocumentNode => {
    // construct query string based on the selected fields
    return gql`
        query Company {
            company {
                ceo
                ${selectedFields.join('\n')}
            }
        }
    `;
};

const Company: React.FC = () => {
    const [query, setQuery] = useState<DocumentNode>(getCompanyQuery(defaultSelection));
    const { setValue } = useForm();
    useEffect(() => {
      setValue('Field', defaultSelection); // Set default selections
      LoadMore()
    }, [setValue]);

    const onSubmit = async (selected: SelectedType) => {
      setQuery(getCompanyQuery(selected.Field));
      await LoadMore()
    };
    const [LoadMore, { loading, error, data }] = useLazyQuery(query);

  
  return (
    <div className="bg-gray-200 dark:bg-[#25282a] min-h-screen">
      <div className="relative pb-32 bg-gray-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src={backgroundImage}
            alt="rocket"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            Company
          </h1>
        </div>
      </div>

      <section
        className="max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8"
        aria-labelledby="contact-heading"
      >
        <div className="mt-5">
            {/* Display Data and Field Selector */}
            <FieldSelectionBar onSubmit={onSubmit} fields={fields} />
            {data ? ( 
                <ul className="grid grid-cols-3 gap-4 mt-5">
                {Object.keys(data.company).map((field, index) => {
                    // Filter out the __typename field
                    if (field !== '__typename') {
                    return (
                              <DynamicCard title={field + ": " + data.company[field]} key={index}/>
                    );
                    }
                    return null; // Exclude the field
                })}
                </ul>
                ) : (
                    loading ? <p>loading</p> :
                    <p>No company data available.</p>
            )}
        </div>
      </section>
      <ScrollToTop />
    </div>
  );
};
export default Company;
