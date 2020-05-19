<?php
require_once __DIR__ . "/Room.php";
require_once __DIR__ . "/Prescription.php";
require_once __DIR__ . "/MedicalService.php";

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\MappedSuperclass
 */
class Person
{
    protected EntityManager $entityManager;

    /**
     * @param EntityManager $entityManager
     */
    public function setEntityManager(EntityManager $entityManager): void
    {
        $this->entityManager = $entityManager;
    }
    /**
     * @ORM\Column(length=30)
     */
    private $ssn;

    /**
     * @ORM\Column(length=30)
     */
    private $name;

    /**
     * @ORM\Column(length=7)
     */
    private $gender;

    /**
     * @ORM\Column(type="date")
     */
    private $dob;

    /**
     * @ORM\Column(type="integer")
     */
    private $age;

    /**
     * @ORM\Column(length=12)
     */
    private $phone;

    /**
     * Get the value of ssn
     */
    public function getSsn()
    {
        return $this->ssn;
    }

    /**
     * Set the value of ssn
     *
     * @return  self
     */
    public function setSsn($ssn)
    {
        $this->ssn = $ssn;

        return $this;
    }

    /**
     * Get the value of name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return  self
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get the value of gender
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * Set the value of gender
     *
     * @return  self
     */
    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * Get the value of dob
     */
    public function getDob()
    {
        return $this->dob->format('Y-m-d');
    }

    /**
     * Set the value of dob
     *
     * @param string $dob
     * @return  self
     */
    public function setDob(string $dob)
    {
        $this->dob = DateTime::createFromFormat("Y-m-d", $dob);
        $this->setAge();
        return $this;
    }

    /**
     * Get the value of age
     */
    public function getAge()
    {
        return date_diff(new DateTime('now'), $this->dob)->format("%Y");
    }

    /**
     * Set the value of age
     *
     * @return  self
     */
    public function setAge()
    {
        $this->age = date_diff(new DateTime('now'), $this->dob)->format("%Y");

        return $this;
    }

    /**
     * Get the value of phone
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set the value of phone
     *
     * @return  self
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    public function get() {
        return [
            "ssn" => $this->getSsn(),
            "name" => $this->getName(),
            "gender" => $this->getGender(),
            "dob" => $this->getDob(),
            "age" => $this->getAge(),
            "phone" => $this->getPhone()
        ];
    }
}
